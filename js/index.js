// document.querySelector("#logout").addEventListener("click", () => {
//   localStorage.clear();
// });
async function getBack() {
  let token = localStorage.getItem("token");
  console.log(token);
  const res = await axios({
    method: "get",
    url: "/dashboard",
  });
  const arr = res.data.overview;
  const echartsArr = res.data.year;
  // const salaryArr = res.salaryData;
  // console.log(salaryArr);
  const groupArr = res.data.groupData;
  const salaryArr = res.data.salaryData;
  console.log(salaryArr);
  let sA1 = [];
  let sA2 = [];
  let sA3 = [];
  salaryArr.forEach((item) => {
    sA1.push({ value: item.g_count + item.b_count, name: item.label });
    sA2.push({ value: item.g_count, name: item.label });
    sA3.push({ value: item.b_count, name: item.label });
  });
  function salaryEcharts(echartsArr) {
    var myChart = echarts.init(document.getElementById("line"));
    var option = {
      title: {
        text: "2022全学科薪资走势",
        left: "2%",
        top: "2%",
      },
      xAxis: {
        type: "category",
        data: echartsArr.map((item) => {
          return item.month;
        }),
        axisLine: {
          lineStyle: {
            color: "#999",
            type: "dashed",
          },
        },
      },
      yAxis: {
        type: "value",
        splitLine: {
          lineStyle: {
            type: "dashed",
          },
        },
      },
      tooltip: {
        trigger: "axis",
      },
      grid: {
        left: "15%",
        top: "15%",
        right: "15%",
        bottom: "15%",
      },
      series: [
        {
          data: echartsArr.map((item) => {
            return item.salary;
          }),
          type: "line",
          smooth: true,
          symbolSize: "10",
          lineStyle: {
            width: 5,
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#92c6ff", // 0% 处的颜色
                },
                {
                  offset: 0.6,
                  color: "#fff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
      color: ["#62afff"],
    };
    myChart.setOption(option);
  }
  salaryEcharts(echartsArr);
  function salaryGroup(groupArr) {
    var myChart = echarts.init(document.querySelector("#lines"));
    var option1 = {
      xAxis: {
        type: "category",
        data: groupArr[1].map((item) => {
          return item.name;
        }),
        axisLine: {
          lineStyle: {
            color: "#c0bfc5",
            type: "dashed",
          },
        },
      },
      yAxis: {
        type: "value",
        splitLine: {
          show: true,
          lineStyle: {
            color: "#c0bfc5",
            type: "dashed",
          },
        },
      },
      tooltip: {},
      series: [
        {
          data: groupArr[1].map((item) => {
            return item.hope_salary;
          }),

          type: "bar",
        },
        {
          data: groupArr[1].map((item) => {
            return item.salary;
          }),
          type: "bar",
        },
      ],
      color: [
        {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#4ba2f1", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#d4e6fc", // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
        {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#52d8a9", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#d0f4e8", // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      ],
    };
    myChart.setOption(option1);
    const btns = document.querySelectorAll("#btns button");
    btns.forEach((ele) => {
      ele.addEventListener("click", function () {
        document.querySelector("#btns .btn-blue").classList.remove("btn-blue");
        this.classList.add("btn-blue");
        const index = this.innerHTML.trim();
        option1.xAxis.data = groupArr[index].map((ele) => ele.name);
        option1.series[0].data = groupArr[index].map((ele) => ele.hope_salary);
        option1.series[1].data = groupArr[index].map((ele) => ele.salary);
        myChart.setOption(option1);
      });
    });
  }
  salaryGroup(groupArr);
  function salarySingle(salaryArr) {
    var myChart = echarts.init(document.getElementById("salary"));

    // 指定图表的配置项和数据
    var option = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "85%",
        left: "center",
      },
      title: {
        text: "班级科薪资走势",
        top: "10%",
        left: "20%",
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "50%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: sA1,
        },
      ],
      color: ["#2bd799", "#5097ff", "#fea225", "#40cdff"],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
  salarySingle(salaryArr);
  function salaryDouble(salaryArr) {
    var myChart = echarts.init(document.getElementById("gender"));

    option = {
      title: [
        {
          text: "男女薪资分布",
          left: "2%",
          top: "2%",
        },

        {
          subtext: "女生",
          left: "center",
          top: "90%",
          subtextStyle: {
            fontSize: 16,
            fontWeight: 700,
          },
        },
        {
          subtext: "男生",
          left: "center",
          top: "40%",
          subtextStyle: {
            fontSize: 16,
            fontWeight: 700,
          },
        },
      ],
      series: [
        {
          type: "pie",
          radius: ["40%", "50%"],
          data: sA2,
          label: {
            position: "outer",
            alignTo: "none",
            bleedMargin: 5,
          },

          top: "50%",
          bottom: 0,
        },
        {
          type: "pie",
          radius: ["40%", "50%"],

          data: sA3,
          label: {
            position: "outer",
            alignTo: "labelLine",
            bleedMargin: 5,
          },
          top: "-50%",
          bottom: 0,
        },
      ],
      color: ["#f09a22", "#599cff", "#49d0ff", "#3dd094"],
    };
    myChart.setOption(option);
  }
  salaryDouble(salaryArr);
  //地图
  const initMapChart = (provinceData) => {
    const myEchart = echarts.init(document.querySelector("#map"));
    const dataList = [
      { name: "南海诸岛", value: 0 },
      { name: "北京", value: 0 },
      { name: "天津", value: 0 },
      { name: "上海", value: 0 },
      { name: "重庆", value: 0 },
      { name: "河北", value: 0 },
      { name: "河南", value: 0 },
      { name: "云南", value: 0 },
      { name: "辽宁", value: 0 },
      { name: "黑龙江", value: 0 },
      { name: "湖南", value: 0 },
      { name: "安徽", value: 0 },
      { name: "山东", value: 0 },
      { name: "新疆", value: 0 },
      { name: "江苏", value: 0 },
      { name: "浙江", value: 0 },
      { name: "江西", value: 0 },
      { name: "湖北", value: 0 },
      { name: "广西", value: 0 },
      { name: "甘肃", value: 0 },
      { name: "山西", value: 0 },
      { name: "内蒙古", value: 0 },
      { name: "陕西", value: 0 },
      { name: "吉林", value: 0 },
      { name: "福建", value: 0 },
      { name: "贵州", value: 0 },
      { name: "广东", value: 0 },
      { name: "青海", value: 0 },
      { name: "西藏", value: 0 },
      { name: "四川", value: 0 },
      { name: "宁夏", value: 0 },
      { name: "海南", value: 0 },
      { name: "台湾", value: 0 },
      { name: "香港", value: 0 },
      { name: "澳门", value: 0 },
    ];
    let option = {
      title: {
        text: "籍贯分布",
        top: 10,
        left: 10,
        textStyle: {
          fontSize: 16,
        },
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} 位学员",
        borderColor: "transparent",
        backgroundColor: "rgba(0,0,0,0.5)",
        textStyle: {
          color: "#fff",
        },
      },
      visualMap: {
        min: 0,
        max: 6,
        left: "left",
        bottom: "20",
        text: ["6", "0"],
        inRange: {
          color: ["#ffffff", "#0075F0"],
        },
        show: true,
        left: 40,
      },
      geo: {
        map: "china",
        roam: false,
        zoom: 1.0,
        label: {
          normal: {
            show: true,
            fontSize: "10",
            color: "rgba(0,0,0,0.7)",
          },
        },
        itemStyle: {
          normal: {
            borderColor: "rgba(0, 0, 0, 0.2)",
            color: "#e0ffff",
          },
          emphasis: {
            areaColor: "#34D39A",
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 20,
            borderWidth: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
      series: [
        {
          name: "籍贯分布",
          type: "map",
          geoIndex: 0,
          data: dataList,
        },
      ],
    };
    myEchart.setOption(option);
  };
  initMapChart();
  //地图
  for (const k in arr) {
    document.querySelector(`[name=${k}]`).innerHTML = arr[k];
  }
}
getBack();
document.querySelector("#logout").addEventListener("click", () => {
  localStorage.clear();
  getBack();
});
const username = localStorage.getItem("username");
console.log(username);
const name1 = document.querySelector(".d-lg-block .font-weight-bold");

name1 && (name1.innerHTML = username);
