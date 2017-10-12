import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/throw';

import { Device } from '@ionic-native/device';
import { NativeStorage } from '@ionic-native/native-storage';

import { Location } from '../models/location';

@Injectable()
export class ApiService {

  timeout:number = 10000;

  constructor(
    protected http:Http,
    protected device:Device,
    protected platform:Platform,
    protected storage:NativeStorage) {
  }

  getLocations(cache:boolean=true):Promise<Location[]> {
    return new Promise((resolve, reject) => {
      this.getUrl().then((url:string) => {
        console.info(`getLocations ${url}`);
        this.getData(url, cache).then((data:any) => {
          console.info(`getLocations ${JSON.stringify(data)}`);
          let locations:Location[] = [];
          if (data.d && data.d.length > 0) {
            for (let entry of data.d) {
              let location = <Location> {
                name: entry.name_of_city_facility,
                address: `${entry.address}, Saskatoon, Saskatchewan`,
                description: entry.how_to_access_aed,
                units: entry.number_of_aed_units
              };
              locations.push(location);
            }
          }
          resolve(locations);
        },
        (error:any) => {
          console.info(`getLocations ${JSON.stringify(error)}`);
          reject(error);
        });
      });
    });
  }

  getUrl():Promise<string> {
    return new Promise((resolve, reject) => {
      this.platform.ready().then(() => {
        if (this.device.isVirtual) {
          resolve("/AEDLocations?format=json");
        }
        else {
          resolve("http://opendata-saskatoon.cloudapp.net:8080/v1/SaskatoonOpenDataCatalogueBeta/AEDLocations?format=json");
        }
      });
    });
  }

  getData(url:string, cache:boolean=true):Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (cache) {
        console.info(`getData ${cache} ${url}`);
        this.storage.getItem(url).then((data:any) =>  {
          console.info(`getData ${cache} ${JSON.stringify(data)}`);
          if (data) {
            resolve(data);
          }
          else {
            this.getData(url, false).then((data:any) => {
              resolve(data);
            },
            (error:any) => {
              reject(error);
            });
          }
        },
        (error:any) => {
          this.getData(url, false).then((data:any) => {
            resolve(data);
          },
          (error:any) => {
            reject(error);
          });
        });
      }
      else {
        let headers = new Headers({
          "Accept": "application/json",
          "Content-Type": "application/json",
        });
        let options = new RequestOptions({
          headers: headers,
        });
        console.info(`getData ${cache} ${url}`);
        this.http.get(url, options)
          .timeout(this.timeout)
          .map((response:Response) => response.json())
          .catch((error:any) => {
            console.error(`getData ${cache} ${url} ${JSON.stringify(error)}`);
            if (error.name && error.name === "TimeoutError") {
              return Observable.throw("Request Timeout");
            }
            return Observable.throw(error || 'Request Error');
          })
          .subscribe((data:any) => {
            console.info(`getData ${cache} ${JSON.stringify(data)}`);
            this.storage.setItem(url, data).then((saved:any) => {
              resolve(data);
            });
          },
          (error:any) => {
            reject(JSON.stringify(error));
          });
      }
    });
  }

}
