//焦點圖
$.fn.shapeFocus = function (options) {
  /**
   * 未發現定位信息，不執行
   * */
  if (!options.position) {
    return;
  }
  /**
   * 安全鎖
   * */
  var lockState = true;
  /**
   * jq-dom
   * */
  var $this = this,
    $prevBtn = $this.find(".prev-btn"),
    $nextBtn = $this.find(".next-btn"),
    $sliderPanel = $this.find(".slider-panel");
  /**
   * 消失時的移動距離，用於換算時的y周移動長度
   * */
  var distance = $this.height() / 2;
  /**
   * 輪播等待時間
   * */
  var delay = options.delay || 3000;
  /**
   * 動畫過度時間
   * */
  var transitionTime = 200;
  /**
   * sliderLength : slider的總數
   * visibleLength : 可顯示的個數
   * */
  var sliderLength = $sliderPanel.find(".slider").length,
    visibleLength = Math.min(sliderLength, options.position.length);
  /**
   * 根據visibleLength截取坐標信息
   * */
  var basePosition = options.position.slice(0, visibleLength);
  /**
   * 判斷是否需要補位
   * 當傳入的坐標信息和slider的個數相同時，執行動畫時需要補位
   * */
  var isClone = visibleLength == $sliderPanel.find(".slider").length;
  /**
   * 元素重置,清理屬性
   * */
  function cleanAttr($target) {
    if (!$target || !$target.length) {
      return;
    }
    $target
      .removeClass("visible")
      .removeAttr("data-angle")
      .removeAttr("data-x")
      .removeAttr("data-y")
      .removeAttr("style");
  }
  //獲取當前坐標
  function getCurPosition(state) {
    var result = basePosition.splice(0, 1)[0];
    basePosition.push(result);
    return result;
  }
  //坐標隊列回退
  function positionReset() {
    var result = basePosition.splice(basePosition.length - 1, 1)[0];
    basePosition.unshift(result);
  }
  /**
   * 獲取transition樣式
   * */
  function getTransition() {
    var keys = ["left", "top", "transform", "opacity"];
    var result = [];
    $.each(keys, function (i, key) {
      result.push(key + " " + transitionTime / 1000 + "s ease-in");
    });
    return result.join(",");
  }
  /**
   * 根據index獲取縮放
   * */
  function getScaleByZindex(zIndex) {
    return zIndex / sliderLength / 10 + 0.9;
  }
  /**
   * 基於坐標獲取樣式信息
   * index : 當前元素的索引，用於計算縮放，z軸
   * */
  function getInfoByPosition(index) {
    //獲取當前坐標
    var pos = getCurPosition();
    var zIndex = sliderLength - index;
    return {
      attr: {
        angle: pos.angle,
        x: pos.x,
        y: pos.y,
      },
      css: {
        left: pos.x,
        top: pos.y,
        transform:
          "rotate(" +
          pos.angle +
          "deg) scale(" +
          getScaleByZindex(zIndex) +
          ")",
        opacity: 1,
        zIndex: zIndex,
      },
    };
  }
  //預設設定坐標
  function initSetting() {
    var $slider = $sliderPanel.find(".slider");
    for (var i = 0; i < visibleLength; i++) {
      var info = getInfoByPosition(i);
      //設定樣式和屬性
      $slider
        .eq(i)
        .css(info.css)
        .attr({
          "data-angle": info.attr.angle,
          "data-x": info.attr.x,
          "data-y": info.attr.y,
        })
        .addClass("visible");
    }
  }
  //退出
  function leave(fn) {
    var $target = $sliderPanel.find(".slider").last();
    //獲取屬性
    var x = Number($target.attr("data-x")),
      y = Number($target.attr("data-y")),
      angle = Number($target.attr("data-angle"));
    //設定樣式&清理屬性
    $target.css({
      opacity: "",
      top: "",
      left: "",
      transform: "",
    });
    //回調
    setTimeout(function () {
      //清理補位
      if (isClone) {
        $target.remove();
      } else {
        //清理樣式
        cleanAttr($target);
      }
      //回調
      fn && fn();
    }, transitionTime);
  }
  //進入
  function enter() {
    var $slider = $sliderPanel.find(".slider");
    for (var i = 0; i < visibleLength; i++) {
      var $target = $slider.eq(i);
      if (i == visibleLength - 1) {
        var info = getInfoByPosition(i);
        //設定樣式和屬性
        $target
          .css(info.css)
          .attr({
            "data-angle": info.attr.angle,
            "data-x": info.attr.x,
            "data-y": info.attr.y,
          })
          .addClass("visible");
      } else {
        /**
         * 更新
         * zindex、angle
         * */
        var zIndex = sliderLength - i;
        //設定樣式
        $target.css({
          zIndex: zIndex,
          transform:
            "rotate(" +
            $target.attr("data-angle") +
            "deg) scale(" +
            getScaleByZindex(zIndex) +
            ")",
        });
      }
    }
  }
  //進入和離開
  function enterAndLeave(state) {
    if (!lockState) {
      return;
    }
    //掛鎖
    lockState = false;
    /**
     * 判斷前進還是後退
     * state: true(前進)  false(後退)
     * */
    if (state) {
      var $target = $sliderPanel.find(".slider").first();
      //插入隊尾
      $sliderPanel.append($target);
      //需要補位,用克隆品完成消失動畫
      if (isClone) {
        $sliderPanel.append($target.clone());
      }
      /**
       * 異步執行的原因是：同時操作dom時不會觸發css動畫
       * */
      setTimeout(function () {
        //進入
        enter();
        //執行離開
        leave(function () {
          //解鎖
          lockState = true;
        });
      }, 16);
    } else {
      var $target = $sliderPanel.find(".slider").last();
      //插入隊尾
      $sliderPanel.prepend($target);
      //需要補位,用克隆品完成消失動畫
      if (isClone) {
        $sliderPanel.append($target.clone());
      } else {
        cleanAttr($sliderPanel.find(".slider").eq(visibleLength));
      }
      //清理當前元素
      cleanAttr($target);
      //坐標回退
      positionReset();
      /**
       * 異步執行的原因是：同時操作dom時不會觸發css動畫
       * */
      setTimeout(function () {
        //清理補位
        if (isClone) {
          $sliderPanel.find(".slider").last().remove();
        }
        initSetting();
        lockState = true;
      }, 16);
    }
  }
  // 按鈕點選事件
  $prevBtn.on("click", function () {
    enterAndLeave(false);
  });
  $nextBtn.on("click", function () {
    enterAndLeave(true);
  });

  //初始化設定
  initSetting();
};
//調用
/*$(".shape-focus").shapeFocus({
  position: [
    {
      x: 0,
      y: 0,
      angle: 7,
    },
    {
      x: 4.5 + "%",
      y: 1.5 + "%",
      angle: 1,
    },
    {
      x: 6.92 + "%",
      y: 7.40 + "%",
      angle: 8,
    },
  ],
});*/

function setupMobileView() {
  $(".shape-focus").shapeFocus({
    position: [
      {
        x: 0,
        y: 0,
        angle: 0,
      },
      {
        x: 0,
        y: 0,
        angle: 6,
      },
      {
        x: 0,
        y: 10 + "%",
        angle: -6,
      },
    ],
  });

  $(".slider-panel")
    .on("touchstart", function (e) {
      var touch = e.originalEvent,
        startX = touch.changedTouches[0].pageX;
        startY = touch.changedTouches[0].pageY;

      $(this).on("touchmove", function (e) {
        e.preventDefault();
        touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];

        if (touch.pageX - startX > 1.33 + "%") {
          // 右滑
          $(".next-btn").click();
          $(this).off("touchmove");
        } else if (touch.pageX - startX < -1.33 + "%") {
          // 左滑
          $(".prev-btn").click();
          $(this).off("touchmove");
        }

        if (touch.pageY - startY != 0) {
          // 上下滑动
          $(this).off("touchmove");
        }
      });
    })
    .on("touchend", function () {
      $(this).off("touchmove");
    });
}

if (window.innerWidth <= 750) {
  // mob
  setupMobileView();
} else {
  // pc
  $(".shape-focus").shapeFocus({
    position: [
      {
        x: 0,
        y: 0,
        angle: 7,
      },
      {
        x: 4.5 + "%",
        y: 1.5 + "%",
        angle: 1,
      },
      {
        x: 6.92 + "%",
        y: 7.40 + "%",
        angle: 8,
      },
    ],
  });
}