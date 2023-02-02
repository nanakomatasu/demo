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
  console.log(res.data);
  const groupArr = res.data.groupData;
  console.log(groupArr);
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
