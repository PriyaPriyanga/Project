import { Component, OnInit, Input } from '@angular/core';
import { ViewChild } from '@angular/core'
import { RestService } from '../../Service/rest.service';
import { HttpClient } from '@angular/common/http';
import { TableModule } from 'primeng/table'

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css'],
  providers : [RestService]
  
})
export class TestComponentComponent 
{
 

  dataAgent : any;
  _dataTable : any;
  cols: any = [];

  title='test component';

  dynamicExportFileName : string  ="CustomerMessages";


 

  public csvRecords: any[] = [];
  
  @ViewChild('fileImportInput') fileImportInput: any;
  
  fileChangeListener($event: any): void {
    
        let text = [];
        let files = $event.srcElement.files;
    
        if (this.isCSVFile(files[0])) {
    
          let input = $event.target;
          let reader = new FileReader();
          reader.readAsText(input.files[0]);
    
          reader.onload = () => {
            let csvData = reader.result;
            let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
    
            let headersRow = this.getHeaderArray(csvRecordsArray);
    
            this.csvRecords = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
          };
    
          reader.onerror = function () {
            alert('Unable to read ' + input.files[0]);
          };
    
        } else {
          alert("Please import valid .csv file.");
          this.fileReset();
        }
      }
      
      getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
        let dataArr = [];
    
        for (let i = 1; i < csvRecordsArray.length; i++) {
          let data = (<string>csvRecordsArray[i]).split(',');
    
          // FOR EACH ROW IN CSV FILE IF THE NUMBER OF COLUMNS
          // ARE SAME AS NUMBER OF HEADER COLUMNS THEN PARSE THE DATA
          if (data.length == headerLength) {
    
            let csvRecord: CSVRecord = new CSVRecord();
    
            csvRecord.id = data[0].trim();
            csvRecord.name = data[1].trim();
            
    
            dataArr.push(csvRecord);
          }
        }
        return dataArr;
      }
    
      // CHECK IF FILE IS A VALID CSV FILE
      isCSVFile(file: any) {
        return file.name.endsWith(".csv");
      }


       // GET CSV FILE HEADER COLUMNS
  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.fileImportInput.nativeElement.value = "";
    this.csvRecords = [];
  }



   constructor(private http : HttpClient, private service : RestService) { 

   }

  ngOnInit() {
    
    this.cols = [
      {field : "id", header : "ID" },
      {field : "name", header : "Name"}

    ];
    
     this.service.getDetails().subscribe(
      (response: Response) => {
        this.dataAgent = response;
        console.log("Array Agent: " + this.dataAgent);
      },
      (error) => {
        console.log(error)
      }
    )



    
     
  }

  exportCSV() {
  
    this._dataTable = this.dataAgent;
  // this.getJSONData();
}



}

export class CSVRecord {
  
    public id: any;
    public name: any;
  
  
    constructor() {
  
    }
  }