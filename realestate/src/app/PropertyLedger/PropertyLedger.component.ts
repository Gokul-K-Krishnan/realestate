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
import { PropertyLedgerService } from './PropertyLedger.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-PropertyLedger',
	templateUrl: './PropertyLedger.component.html',
	styleUrls: ['./PropertyLedger.component.css'],
  providers: [PropertyLedgerService]
})
export class PropertyLedgerComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
	private errorMessage;

  
      
          buyer = new FormControl("", Validators.required);
        
  
      
          seller = new FormControl("", Validators.required);
        
  
      
          property = new FormControl("", Validators.required);
        
        
  


  constructor(private servicePropertyLedger:PropertyLedgerService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          buyer:this.buyer,
        
    
        
          seller:this.seller,
        
    
        
          property:this.property
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.servicePropertyLedger.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the transaction field to update
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
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "buyer":null,
        
      
        
          "seller":null,
        
      
        
          "property":null
        
      
      });
  }
  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: "org.acme.landregistry.PropertyLedger",
      
        
          "buyer":this.buyer.value,
        
      
        
          "seller":this.seller.value,
        
      
        
          "property":this.property.value
      
    };

    this.myForm.setValue({
      
        
          "buyer":null,
        
      
        
          "seller":null,
        
      
        
          "property":null
        
      
    });

    return this.servicePropertyLedger.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "buyer":null,
        
      
        
          "seller":null,
        
      
        
          "property":null
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }




}

