import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder }  from '@angular/forms';
import { WeatherService } from '../_services/weather.service';

@Component({
  selector: 'app-weathers',
  templateUrl: './weathers.component.html',
  styleUrls: ['./weathers.component.css']
})
export class WeathersComponent implements OnInit {
  searchForm: FormGroup;
  isSubmit = false;
  submitted = false;
  weatherInfo: [];
  cityName: string;

  constructor(private weatherService: WeatherService,
    public formBuilder: FormBuilder) { }

  ngOnInit() {

    this.searchForm = this.formBuilder.group({
      city: this.formBuilder.control('london', [Validators.required, Validators.minLength(2)]),
    });

    this.getWeather()

  }

  getWeather = () => {
    this.submitted = true;
    this.cityName = this.searchForm.controls['city'].value;
    if (this.searchForm.valid) {
      this.weatherService.getCityWeather(this.searchForm.controls['city'].value).subscribe((weather) => {
        this.isSubmit = true;
        if (weather.status) {
          this.weatherInfo = weather.result;
          this.submitted = false;
          this.isSubmit = false;
        } else {
          this.submitted = false;
          this.isSubmit = false;
        }
      }, (error) => {
        this.submitted = false;
        this.isSubmit = false;
      });
    }
  }

}
