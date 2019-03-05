/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BusAssetService } from './BusAsset.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-busasset',
  templateUrl: './BusAsset.component.html',
  styleUrls: ['./BusAsset.component.css'],
  providers: [BusAssetService]
})
export class BusAssetComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  assetID = new FormControl('', Validators.required);
  nameOfAsset = new FormControl('', Validators.required);
  isStressed = new FormControl('', Validators.required);
  assetList = new FormControl('', Validators.required);
  marketValue = new FormControl('', Validators.required);
  termID = new FormControl('', Validators.required);
  Description = new FormControl('', Validators.required);
  auditDate = new FormControl('', Validators.required);
  auditReport = new FormControl('', Validators.required);
  auditrating = new FormControl('', Validators.required);
  diligenceDate = new FormControl('', Validators.required);
  diligenceReport = new FormControl('', Validators.required);
  diligenceRating = new FormControl('', Validators.required);
  owner = new FormControl('', Validators.required);

  constructor(public serviceBusAsset: BusAssetService, fb: FormBuilder) {
    this.myForm = fb.group({
      assetID: this.assetID,
      nameOfAsset: this.nameOfAsset,
      isStressed: this.isStressed,
      assetList: this.assetList,
      marketValue: this.marketValue,
      termID: this.termID,
      Description: this.Description,
      auditDate: this.auditDate,
      auditReport: this.auditReport,
      auditrating: this.auditrating,
      diligenceDate: this.diligenceDate,
      diligenceReport: this.diligenceReport,
      diligenceRating: this.diligenceRating,
      owner: this.owner
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceBusAsset.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.bca.bcanetwork.BusAsset',
      'assetID': this.assetID.value,
      'nameOfAsset': this.nameOfAsset.value,
      'isStressed': this.isStressed.value,
      'assetList': this.assetList.value,
      'marketValue': this.marketValue.value,
      'termID': this.termID.value,
      'Description': this.Description.value,
      'auditDate': this.auditDate.value,
      'auditReport': this.auditReport.value,
      'auditrating': this.auditrating.value,
      'diligenceDate': this.diligenceDate.value,
      'diligenceReport': this.diligenceReport.value,
      'diligenceRating': this.diligenceRating.value,
      'owner': this.owner.value
    };

    this.myForm.setValue({
      'assetID': null,
      'nameOfAsset': null,
      'isStressed': null,
      'assetList': null,
      'marketValue': null,
      'termID': null,
      'Description': null,
      'auditDate': null,
      'auditReport': null,
      'auditrating': null,
      'diligenceDate': null,
      'diligenceReport': null,
      'diligenceRating': null,
      'owner': null
    });

    return this.serviceBusAsset.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'assetID': null,
        'nameOfAsset': null,
        'isStressed': null,
        'assetList': null,
        'marketValue': null,
        'termID': null,
        'Description': null,
        'auditDate': null,
        'auditReport': null,
        'auditrating': null,
        'diligenceDate': null,
        'diligenceReport': null,
        'diligenceRating': null,
        'owner': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.bca.bcanetwork.BusAsset',
      'nameOfAsset': this.nameOfAsset.value,
      'isStressed': this.isStressed.value,
      'assetList': this.assetList.value,
      'marketValue': this.marketValue.value,
      'termID': this.termID.value,
      'Description': this.Description.value,
      'auditDate': this.auditDate.value,
      'auditReport': this.auditReport.value,
      'auditrating': this.auditrating.value,
      'diligenceDate': this.diligenceDate.value,
      'diligenceReport': this.diligenceReport.value,
      'diligenceRating': this.diligenceRating.value,
      'owner': this.owner.value
    };

    return this.serviceBusAsset.updateAsset(form.get('assetID').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceBusAsset.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceBusAsset.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'assetID': null,
        'nameOfAsset': null,
        'isStressed': null,
        'assetList': null,
        'marketValue': null,
        'termID': null,
        'Description': null,
        'auditDate': null,
        'auditReport': null,
        'auditrating': null,
        'diligenceDate': null,
        'diligenceReport': null,
        'diligenceRating': null,
        'owner': null
      };

      if (result.assetID) {
        formObject.assetID = result.assetID;
      } else {
        formObject.assetID = null;
      }

      if (result.nameOfAsset) {
        formObject.nameOfAsset = result.nameOfAsset;
      } else {
        formObject.nameOfAsset = null;
      }

      if (result.isStressed) {
        formObject.isStressed = result.isStressed;
      } else {
        formObject.isStressed = null;
      }

      if (result.assetList) {
        formObject.assetList = result.assetList;
      } else {
        formObject.assetList = null;
      }

      if (result.marketValue) {
        formObject.marketValue = result.marketValue;
      } else {
        formObject.marketValue = null;
      }

      if (result.termID) {
        formObject.termID = result.termID;
      } else {
        formObject.termID = null;
      }

      if (result.Description) {
        formObject.Description = result.Description;
      } else {
        formObject.Description = null;
      }

      if (result.auditDate) {
        formObject.auditDate = result.auditDate;
      } else {
        formObject.auditDate = null;
      }

      if (result.auditReport) {
        formObject.auditReport = result.auditReport;
      } else {
        formObject.auditReport = null;
      }

      if (result.auditrating) {
        formObject.auditrating = result.auditrating;
      } else {
        formObject.auditrating = null;
      }

      if (result.diligenceDate) {
        formObject.diligenceDate = result.diligenceDate;
      } else {
        formObject.diligenceDate = null;
      }

      if (result.diligenceReport) {
        formObject.diligenceReport = result.diligenceReport;
      } else {
        formObject.diligenceReport = null;
      }

      if (result.diligenceRating) {
        formObject.diligenceRating = result.diligenceRating;
      } else {
        formObject.diligenceRating = null;
      }

      if (result.owner) {
        formObject.owner = result.owner;
      } else {
        formObject.owner = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'assetID': null,
      'nameOfAsset': null,
      'isStressed': null,
      'assetList': null,
      'marketValue': null,
      'termID': null,
      'Description': null,
      'auditDate': null,
      'auditReport': null,
      'auditrating': null,
      'diligenceDate': null,
      'diligenceReport': null,
      'diligenceRating': null,
      'owner': null
      });
  }

}
