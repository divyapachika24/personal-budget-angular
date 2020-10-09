import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-pied3',
  templateUrl: './pied3.component.html',
  styleUrls: ['./pied3.component.scss']
})
export class Pied3Component implements OnInit {

  public d3dataSource = [];
  private svg;
  private margin = 50;
  private width = 750;
  private height = 600;

  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;


  private createSvg(): void {
    this.svg = d3
    .select('figure#pie')
    .append('svg')
    .attr('width', this.width)
    .attr('height', this.height)
    .append('g')
    .attr(
      'transform',
      'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
    );
}

drawChart(data): void {
  for (var i = 0; i < data.myBudget.length; i++) {
    this.labels[i] = data.myBudget[i].title;
  }

  var color = d3.scaleOrdinal().domain(this.labels).range(d3.schemeDark2);

  // The position of each group on pie will be computed
  const pie = d3.pie<any>().value((d: any) => Number(d.budget));

  // to build pie chart
  var arc = d3
  .arc()
  .innerRadius(this.radius * 0.5)
  .outerRadius(this.radius * 0.8);

// arcs for label positioning
  var outerArc = d3
  .arc()
  .innerRadius(this.radius * 1)
  .outerRadius(this.radius * 0.9);

  var radius = this.radius;



  this.svg
  .selectAll('allSlices')
  .data(pie(data.myBudget))
  .enter()
  .append('path')
  .attr('d', arc)
  .attr('fill', function (d) {
    return color(d.data.title);
  })
  .attr('stroke', 'white')
  .style('stroke-width', '2px')
  .style('opacity', 0.7);

// Adding polylines
  this.svg
  .selectAll('allPolylines')
  .data(pie(data.myBudget))
  .enter()
  .append('polyline')
  .attr('stroke', 'black')
  .style('fill', 'none')
  .attr('stroke-width', 1)
  .attr('points', function (d) {
    var posA = arc.centroid(d);
    var posB = outerArc.centroid(d);
    var posC = outerArc.centroid(d);
    var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
    posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
    return [posA, posB, posC];
  });



  this.svg
  .selectAll('allLabels')
  .data(pie(data.myBudget))
  .enter()
  .append('text')
  .text(function (d) {
    return d.data.title;
  })
  .attr('transform', function (d) {
    var pos = outerArc.centroid(d);
    var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
    pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
    return 'translate(' + pos + ')';
  })
  .style('text-anchor', function (d) {
    var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
    return midangle < Math.PI ? 'start' : 'end';
  });
}


  constructor(private dataService: DataService) { }

  public labels = [];

  ngOnInit(): void {
    this.createSvg();
    this.dataService.getChartData().subscribe((data) => {
      this.drawChart(data);
    });
  }

}
