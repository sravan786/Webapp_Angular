import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { WranglingDataResponse } from 'src/app/dto/wranglingDataResponse';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import {
  DataWranglingChartData,
  DataWranglingChartFormattedData,
} from 'src/app/dto/dataWranglingChartData';

@Component({
  selector: 'app-data-wrangling',
  templateUrl: './data-wrangling.component.html',
  styleUrls: ['./data-wrangling.component.scss'],
})
export class DataWranglingComponent {
  displayedColumns2: string[] = [
    'accountId',
    'patientId',
    'product',
    'diseaseType',
    'segment',
    'mot',
    'minship',
    'maxship',
    'observed',
  ];

  dataSource2: any;
  durationInSeconds = 5;
  loading = false;
  private root!: am5.Root;
  dataWranglingChartData!: DataWranglingChartData;
  dataWranglingChartFormattedData!: DataWranglingChartFormattedData[];

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  getRawDataCollection() {
    this.loading = true;
    this.authService.getWranglingDataCollection().subscribe((resp) => {
      this.loading = false;
      if (resp?.top_five?.length == 0) {
        this.openSnackBar('No Data Found!');
      } else {
        console.log('get api response', resp);
        this.openSnackBar('Data Found!');
        this.dataSource2 = resp as WranglingDataResponse;
        this.showChart(resp?.x, resp?.y);
      }
    });
  }
  openSnackBar(msg: string) {
    this.snackBar.open(msg, 'ok', {
      duration: this.durationInSeconds * 1000,
    });
  }

  showChart(xArr: string[], yArr: number[]) {
    debugger;
    this.cdr.detectChanges();
    /* Chart code */

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
        wheelX: 'none',
        wheelY: 'none',
        paddingLeft: 0,
      })
    );
    debugger;

    // We don't want zoom-out button to appear while animating, so we hide it
    chart.zoomOutButton.set('forceHidden', true);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
      minorGridEnabled: true,
    });
    xRenderer.labels.template.setAll({
      rotation: 0,
      centerY: am5.p50,
      centerX: am5.p50,
      paddingRight: 15,
    });
    xRenderer.grid.template.set('visible', false);

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: 'text',
        renderer: xRenderer,
      })
    );

    let xAxisLabel = xAxis.children.push(
      am5.Label.new(root, {
        text: 'MOT Categories',
        x: am5.p50,
        centerX: am5.p50,
        fontWeight: 'bold',
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Series 1',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        categoryXField: 'text',
      })
    );

    // Rounded corners for columns
    series.columns.template.setAll({
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      strokeOpacity: 0,
    });

    // Add Label bullet
    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationY: 1,
        sprite: am5.Label.new(root, {
          text: "{valueYWorking.formatNumber('#.')}",
          fill: root.interfaceColors.get('alternativeText'),
          centerY: 0,
          centerX: am5.p50,
          populateText: true,
        }),
      });
    });

    // Set data
    //this data will be dynamic from api
    // this.dataWranglingChartData = {
    //   x: [
    //     "1-3 MOT",
    //     "4-6 MOT",
    //     "7-12 MOT",
    //     "12+ MOT"
    //   ],
    //   y: [
    //     1699,
    //     664,
    //     770,
    //     1120
    //   ]
    // };

    this.dataWranglingChartData = {
      x: xArr,
      y: yArr,
    };

    //format data
    this.dataWranglingChartFormattedData = this.dataWranglingChartData.x.map(
      (text: any, index) => ({
        text: text,
        value: this.dataWranglingChartData.y[index],
      })
    );

    let data = this.dataWranglingChartFormattedData;
    // let data = [
    //   {
    //     text: "1-3 MOT",
    //     value: 3511,
    //   },
    //   {
    //     text: "4-6 MOT",
    //     value: 1567,
    //   },
    //   {
    //     text: "7-12 MOT",
    //     value: 1721,
    //   },
    //   {
    //     text: "12+ MOT",
    //     value: 3002
    //   }
    // ];

    xAxis.data.setAll(data);
    series.data.setAll(data);

    // update data with random values each 1.5 sec
    setInterval(function () {
      updateData();
    }, 1500);

    function updateData() {
      am5.array.each(series.dataItems, function (dataItem) {
        let value =
          dataItem.get('valueY') ?? 0 + Math.round(Math.random() * 300 - 150);
        if (value < 0) {
          value = 10;
        }
        // both valueY and workingValueY should be changed, we only animate workingValueY
        dataItem.set('valueY', value);
        dataItem.animate({
          key: 'valueYWorking',
          to: value,
          duration: 600,
          easing: am5.ease.out(am5.ease.cubic),
        });
      });
    }

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
    this.cdr.detectChanges();
  }
}
