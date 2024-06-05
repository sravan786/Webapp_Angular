import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FinalTop25,
  SurvivalModalResponse,
} from 'src/app/dto/survivalModalResponse';
import { AuthService } from 'src/app/services/auth.service';
import * as am5index from '@amcharts/amcharts5/index';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5themes_Responsive from '@amcharts/amcharts5/themes/Responsive';
import * as am5 from '@amcharts/amcharts5';
import { SurvivalModelChartData } from 'src/app/dto/SurvivalModelChartData';
import { SurvivalModalBeforeResponse } from 'src/app/dto/survivalModalBeforeResponse';

@Component({
  selector: 'app-survival-model',
  templateUrl: './survival-model.component.html',
  styleUrls: ['./survival-model.component.scss'],
})
export class SurvivalModelComponent implements OnInit {
  displayedColumns2: string[] = [
    'accountId',
    'patientId',
    'product',
    'diseaseType',
    'segment',
    'mot',
    'observed',
  ];

  displayedColumns3: string[] = ['mot', 'sp', 'kmlbsp', 'kmubsp'];

  dataSource2: any;
  dataSource3: any;
  durationInSeconds = 5;
  loading = false;
  showGraphonBoard = false;

  ngOnInit() {
    this.authService.getSurvivalDataBeforeCollection().subscribe((resp) => {
      this.loading = false;
      if (resp?.df_survival_top_5?.length == 0) {
        this.openSnackBar('No Data Found!');
      } else {
        console.log('get api response', resp);
        this.openSnackBar('Data Found!');
        this.dataSource2 = resp as SurvivalModalBeforeResponse;
      }
    });
  }

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  getSurvivalDataCollection() {
    this.loading = true;
    this.authService.getSurvivalDataAfterCollection().subscribe((resp) => {
      this.loading = false;
      if (resp?.df_final_top_25?.length == 0) {
        this.openSnackBar('No Data Found!');
      } else {
        console.log('get api response', resp);
        this.openSnackBar('Data Found!');
        this.dataSource3 = resp as SurvivalModalResponse;
        this.showGraph(resp?.df_final_top_25);
      }
    });
  }
  openSnackBar(msg: string) {
    this.snackBar.open(msg, 'ok', {
      duration: this.durationInSeconds * 1000,
    });
  }

  showGraph(arr: FinalTop25[]) {
    /* Chart code */
    this.cdr.detectChanges();
    // Parse JSON response and map to instances of the class
    //const responseData: any[] = JSON.parse(jsonResponse);
    const survivalModelChartData: SurvivalModelChartData[] = arr.map(
      (item) =>
        new SurvivalModelChartData(
          item['Months_on_Therapy'],
          item['Survival_Probability'],
          item['KM_Lower_Bound_Survival_Prob'],
          item['KM_Upper_Bound_Survival_Prob']
        )
    );

    // Log the resulting list of class instances
    console.log(survivalModelChartData);

    let data = survivalModelChartData;

    // let data = [
    //   {
    //     monthsOnTherapy: 0,
    //     survivalProbability: 3025,
    //     error: 100
    //   },
    //   {
    //     monthsOnTherapy: "China",
    //     survivalProbability: 1882,
    //     error: 180
    //   },
    //   {
    //     monthsOnTherapy: "Japan",
    //     survivalProbability: 1809,
    //     error1: 130
    //   },
    //   {
    //     monthsOnTherapy: "Germany",
    //     survivalProbability: 1322,
    //     error1: 200
    //   },
    //   {
    //     monthsOnTherapy: "UK",
    //     survivalProbability: 1122,
    //     error1: 150
    //   },
    //   {
    //     monthsOnTherapy: "France",
    //     survivalProbability: 1114,
    //     error1: 110
    //   },
    //   {
    //     monthsOnTherapy: "India",
    //     survivalProbability: 984
    //   }
    // ];

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new('chartdiv');

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelY: 'zoomXY',
        pinchZoomX: true,
      })
    );

    //chart.get("colors").set("step", 2);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/

    let xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 50,
      minorGridEnabled: true,
    });

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'monthsOnTherapy',
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xRenderer.grid.template.setAll({
      location: 1,
    });

    let xAxisLabel = xAxis.children.push(
      am5.Label.new(root, {
        text: 'MOT',
        x: am5.p50,
        centerX: am5.p50,
        fontWeight: 'bold',
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        extraMax: 0.1,
        extraMin: 0.1,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let yAxisLabel = yAxis.children.push(
      am5.Label.new(root, {
        text: 'Survival Probability',
        rotation: -90,
        x: -20,
        centerY: am5.p50,
        y: am5.p50,
        centerX: am5.p50,
        fontWeight: 'bold',
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(
      am5xy.LineSeries.new(root, {
        calculateAggregates: true,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'survivalProbability',
        categoryXField: 'monthsOnTherapy',
        tooltip: am5.Tooltip.new(root, {
          labelText:
            'Survival Probability : {valueY}\nMonths on Therapy:  {monthsOnTherapy}',
        }),
      })
    );

    // Add circle bullet
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
    series.bullets.push(function () {
      let graphics = am5.Circle.new(root, {
        strokeWidth: 2,
        radius: 5,
        stroke: series.get('stroke'),
        fill: root.interfaceColors.get('background'),
      });
      return am5.Bullet.new(root, {
        sprite: graphics,
      });
    });

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        snapToSeries: [series],
      })
    );

    series.data.setAll(data);
    xAxis.data.setAll(data);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
    this.cdr.detectChanges();
  }
}

const jsonResponse = `
[
  {
    "Months on Therapy": 0,
    "Survival Probability": 1,
    "KM Lower Bound Survival Prob": 1,
    "KM Upper Bound Survival Prob": 1
  },
  {
    "Months on Therapy": 1,
    "Survival Probability": 0.88,
    "KM Lower Bound Survival Prob": 0.87,
    "KM Upper Bound Survival Prob": 0.89
  },
  {
    "Months on Therapy": 2,
    "Survival Probability": 0.81,
    "KM Lower Bound Survival Prob": 0.8,
    "KM Upper Bound Survival Prob": 0.82
  },
  {
    "Months on Therapy": 3,
    "Survival Probability": 0.74,
    "KM Lower Bound Survival Prob": 0.73,
    "KM Upper Bound Survival Prob": 0.75
  },
  {
    "Months on Therapy": 4,
    "Survival Probability": 0.7,
    "KM Lower Bound Survival Prob": 0.69,
    "KM Upper Bound Survival Prob": 0.71
  },
  {
    "Months on Therapy": 5,
    "Survival Probability": 0.66,
    "KM Lower Bound Survival Prob": 0.65,
    "KM Upper Bound Survival Prob": 0.67
  },
  {
    "Months on Therapy": 6,
    "Survival Probability": 0.63,
    "KM Lower Bound Survival Prob": 0.62,
    "KM Upper Bound Survival Prob": 0.64
  },
  {
    "Months on Therapy": 7,
    "Survival Probability": 0.6,
    "KM Lower Bound Survival Prob": 0.59,
    "KM Upper Bound Survival Prob": 0.61
  },
  {
    "Months on Therapy": 8,
    "Survival Probability": 0.57,
    "KM Lower Bound Survival Prob": 0.56,
    "KM Upper Bound Survival Prob": 0.58
  },
  {
    "Months on Therapy": 9,
    "Survival Probability": 0.55,
    "KM Lower Bound Survival Prob": 0.54,
    "KM Upper Bound Survival Prob": 0.56
  },
  {
    "Months on Therapy": 10,
    "Survival Probability": 0.53,
    "KM Lower Bound Survival Prob": 0.52,
    "KM Upper Bound Survival Prob": 0.54
  },
  {
    "Months on Therapy": 11,
    "Survival Probability": 0.51,
    "KM Lower Bound Survival Prob": 0.5,
    "KM Upper Bound Survival Prob": 0.52
  },
  {
    "Months on Therapy": 12,
    "Survival Probability": 0.49,
    "KM Lower Bound Survival Prob": 0.48,
    "KM Upper Bound Survival Prob": 0.5
  },
  {
    "Months on Therapy": 13,
    "Survival Probability": 0.48,
    "KM Lower Bound Survival Prob": 0.46,
    "KM Upper Bound Survival Prob": 0.49
  },
  {
    "Months on Therapy": 14,
    "Survival Probability": 0.46,
    "KM Lower Bound Survival Prob": 0.45,
    "KM Upper Bound Survival Prob": 0.47
  },
  {
    "Months on Therapy": 15,
    "Survival Probability": 0.44,
    "KM Lower Bound Survival Prob": 0.43,
    "KM Upper Bound Survival Prob": 0.46
  },
  {
    "Months on Therapy": 16,
    "Survival Probability": 0.43,
    "KM Lower Bound Survival Prob": 0.42,
    "KM Upper Bound Survival Prob": 0.44
  },
  {
    "Months on Therapy": 17,
    "Survival Probability": 0.42,
    "KM Lower Bound Survival Prob": 0.41,
    "KM Upper Bound Survival Prob": 0.43
  },
  {
    "Months on Therapy": 18,
    "Survival Probability": 0.41,
    "KM Lower Bound Survival Prob": 0.39,
    "KM Upper Bound Survival Prob": 0.42
  },
  {
    "Months on Therapy": 19,
    "Survival Probability": 0.39,
    "KM Lower Bound Survival Prob": 0.38,
    "KM Upper Bound Survival Prob": 0.4
  },
  {
    "Months on Therapy": 20,
    "Survival Probability": 0.38,
    "KM Lower Bound Survival Prob": 0.37,
    "KM Upper Bound Survival Prob": 0.39
  },
  {
    "Months on Therapy": 21,
    "Survival Probability": 0.37,
    "KM Lower Bound Survival Prob": 0.36,
    "KM Upper Bound Survival Prob": 0.38
  },
  {
    "Months on Therapy": 22,
    "Survival Probability": 0.36,
    "KM Lower Bound Survival Prob": 0.34,
    "KM Upper Bound Survival Prob": 0.37
  },
  {
    "Months on Therapy": 23,
    "Survival Probability": 0.34,
    "KM Lower Bound Survival Prob": 0.33,
    "KM Upper Bound Survival Prob": 0.36
  },
  {
    "Months on Therapy": 24,
    "Survival Probability": 0.33,
    "KM Lower Bound Survival Prob": 0.32,
    "KM Upper Bound Survival Prob": 0.35
  }
]
`;
