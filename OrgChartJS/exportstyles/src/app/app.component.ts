import OrgChart from "@balkangraph/orgchart.js";
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'exportstyles';
  constructor() { }

  ngOnInit() {
      const tree = document.getElementById('tree');
      if (tree) {
          var chart = new OrgChart(tree, {
              nodeBinding: {
                  field_0: "name",
                  img_0: "img"
              },
              menu: {
                  pdf: {
                      text: 'Export PDF'
                  }
              }
          });
          let nodes = [
              { id: 1, name: "Billy Moore", title: "CEO", img: "https://cdn.balkan.app/shared/2.jpg",},
              { id: 2, pid: 1, name: "Billie Rose", title: "Dev Team Lead", img: "https://cdn.balkan.app/shared/5.jpg" },
              { id: 3, pid: 1, name: "Glenn Bell", title: "HR", img: "https://cdn.balkan.app/shared/10.jpg" },
              { id: 4, pid: 3, name: "Blair Francis", title: "HR", img: "https://cdn.balkan.app/shared/11.jpg" }
          ];

          for (var i = 0; i < nodes.length; i++) {
              var node = nodes[i];
              if (nodes[i].title == "HR") {
                  let newNode: any = {}
                  newNode.id = node.id;
                  newNode.pid = node.pid;
                  newNode.name = node.name;
                  newNode.title = node.title;
                  newNode.img = node.img;
                  newNode.tags = ["HR"];
                  nodes[i] = newNode;
                  console.log(nodes);
              }
          }

          chart.on('exportstart', function (sender, args) {
              args.styles += '<link href="https://fonts.googleapis.com/css?family=Gochi+Hand" rel="stylesheet">';
              let style = document.getElementById('myStyles');
              if (style) {
                  args.styles += style.outerHTML;
              }
          });
          
          chart.load(nodes);
      }
  }
}
