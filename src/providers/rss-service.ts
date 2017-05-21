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
export class RssService {

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
        this.getData(url, cache).then((data:any) => {
          let locations:Location[] = [];
          for (let entry of data.feed.entry) {
            let content = entry.content['m:properties'];
            let location = <Location> {
              name: content['d:name_of_city_facility']['#text'],
              address: `${content['d:address']['#text']}, Saskatoon, Saskatchewan`,
              description: content['d:how_to_access_aed']['#text'],
              units: content['d:number_of_aed_units']['#text']
            };
            locations.push(location);
          }
          resolve(locations);
        },
        (error:any) => {
          reject(error);
        });
      });
    });
  }

  getUrl():Promise<string> {
    return new Promise((resolve, reject) => {
      this.platform.ready().then(() => {
        if (this.device.isVirtual) {
          resolve("/opendata-saskatoon.cloudapp.net:8080/v1/SaskatoonOpenDataCatalogueBeta/AEDLocations/");
        }
        else {
          resolve("http://opendata-saskatoon.cloudapp.net:8080/v1/SaskatoonOpenDataCatalogueBeta/AEDLocations/");
        }
      });
    });
  }

  getData(url:string, cache:boolean=true):Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (cache) {
        this.storage.getItem(url).then((data:any) =>  {
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
        });
      }
      else {
        let headers = new Headers({
          "Accept": "application/xml",
          "Content-Type": "application/xml",
        });
        let options = new RequestOptions({
          headers: headers,
        });
        this.http.get(url, options)
          .timeout(this.timeout)
          .map((response:Response) => {
            let text = response.text();
            let xml = this.getXml(text);
            return this.getJson(xml);
          })
          .catch((error:any) => {
            if (error.name && error.name === "TimeoutError") {
              return Observable.throw("Request Timeout");
            }
            return Observable.throw(error || 'Request Error');
          })
          .subscribe((data:any) => {
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

  getXml(text:any):any {
    let parser = new DOMParser();
    let xml = parser.parseFromString(text, "text/xml");
    return xml;
  }

  getJson(xml:any):any {
    'use strict';
    var obj = {};
    if (xml.nodeType == 1) {
      if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    }
    else if (xml.nodeType == 3) {
      obj = xml.nodeValue;
    }
    if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof (obj[nodeName]) == "undefined") {
          obj[nodeName] = this.getJson(item);
        }
        else {
          if (typeof (obj[nodeName].push) == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(this.getJson(item));
        }
      }
    }
    return obj;
  }

}
