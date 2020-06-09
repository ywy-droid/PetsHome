Component({
  properties: {
    // tupian | tupian1 | tupian11 | tupian3-copy | tupian2 | tupian3 | tupian1-copy | tupian1-copy1 | tupian-copy | tubiao--copy-copy | xin | xin1 | tubiao- | xin2 | chongwupeidui-copy | chongwupeidui-copy-copy | chongwufuwu | chongwu | chongwux | maogouchongwuzhaoyinxianxing | chongwu1 | tubiao_ | chongwufuwu1 | chongwupeidui | pets | chongwu2 | chongwu-copy | chongwu1-copy | chongwu1-copy-copy | chongwufuwu-copy | chongwufuwu-copy1 | index-copy | chanshiguanqu | chanshiguanqu-copy
    name: {
      type: String,
    },
    // string | string[]
    color: {
      type: null,
      observer: function(color) {
        this.setData({
          colors: this.fixColor(),
          isStr: typeof color === 'string',
        });
      }
    },
    size: {
      type: Number,
      value: 18,
      observer: function(size) {
        this.setData({
          svgSize: size,
        });
      },
    },
  },
  data: {
    colors: '',
    svgSize: 18,
    quot: '"',
    isStr: true,
  },
  methods: {
    fixColor: function() {
      var color = this.data.color;
      var hex2rgb = this.hex2rgb;

      if (typeof color === 'string') {
        return color.indexOf('#') === 0 ? hex2rgb(color) : color;
      }

      return color.map(function (item) {
        return item.indexOf('#') === 0 ? hex2rgb(item) : item;
      });
    },
    hex2rgb: function(hex) {
      var rgb = [];

      hex = hex.substr(1);

      if (hex.length === 3) {
        hex = hex.replace(/(.)/g, '$1$1');
      }

      hex.replace(/../g, function(color) {
        rgb.push(parseInt(color, 0x10));
        return color;
      });

      return 'rgb(' + rgb.join(',') + ')';
    }
  }
});
