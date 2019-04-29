"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("./utils");

var Carousel =
/*#__PURE__*/
function () {
  function Carousel(element, options) {
    _classCallCheck(this, Carousel);

    this._timeout = false;
    this._stop = false;
    this._paused = false;
    this._time = 0;
    this._running = false;
    var defaults = {
      autoplay: 0,
      prev: true,
      next: true,
      progress: false,
      loop: false
    };
    this.options = Object.assign({}, defaults, options);
    this.carousel = element;
    this.controller = this.carousel.querySelector('.carousel__controller');
    this.items = this.carousel.querySelectorAll('.carousel__items .item');
    this.nodes = Array.from(this.items);
    this.maxLength = this.items.length;
    this.maxArrayLength = this.maxLength - 1;

    if (this.maxLength <= 1) {
      throw new Error('You must have at least two items in your carousel!');
    }

    if (!this.carousel.querySelector('.carousel__items .item.active')) {
      this.items[0].classList.add('active');
    }

    this.activeItem = this.carousel.querySelector('.carousel__items .item.active');
    this.buildHeight();
    this.createKey(); // just for developing to better diff the items

    this.initCtrl();
  }

  _createClass(Carousel, [{
    key: "initCtrl",
    value: function initCtrl() {
      return __awaiter(this, void 0, void 0,
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.controller) {
                  _context.next = 2;
                  break;
                }

                throw new Error('You must have a controller element if you want to use controlls!');

              case 2:
                if (!this.options.progress) {
                  _context.next = 5;
                  break;
                }

                _context.next = 5;
                return this.createProgress();

              case 5:
                if (!(this.options.prev && this.controller)) {
                  _context.next = 10;
                  break;
                }

                _context.next = 8;
                return this.createPrev();

              case 8:
                this.prevCtrl = this.controller.querySelector('.prev');
                this.prevCtrl.addEventListener('click', function () {
                  _this.stop();

                  _this.prevItem();
                });

              case 10:
                if (!(this.options.next && this.controller)) {
                  _context.next = 15;
                  break;
                }

                _context.next = 13;
                return this.createNext();

              case 13:
                this.nextCtrl = this.controller.querySelector('.next');
                this.nextCtrl.addEventListener('click', function () {
                  _this.stop();

                  _this.nextItem();
                });

              case 15:
                // on mouse
                // this.carousel.addEventListener('mouseover', () => this.mouseOver())
                // this.carousel.addEventListener('mouseout', () => this.mouseOut())
                // on autoplay
                if (this.options.autoplay) {
                  if (typeof this.options.autoplay !== 'number') {
                    console.error('Autoplay must be type of number!');
                  } else if (this.options.autoplay <= 500) {
                    console.error('Autoplay must be higher then 500!');
                  } else {
                    this.autoplay();
                  }
                }

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }, {
    key: "mouseOver",
    value: function mouseOver() {
      console.log('PAUSE');
    }
  }, {
    key: "mouseOut",
    value: function mouseOut() {
      console.log('START');
    }
  }, {
    key: "read",
    value: function read() {
      return new Date().getTime() - this._time;
    }
  }, {
    key: "autoplay",
    value: function autoplay() {
      this._timeout = this.options.autoplay;
      this.autoplayNext();
    }
  }, {
    key: "pause",
    value: function pause() {
      if (this._paused && !this._running) return; // prevent multiple calls
      // prettier-ignore

      var pastTime = new Date().getTime() - this._time;

      this._timeout = Math.round(Number(this._timeout) - pastTime) + 1;
      this._paused = true;
      this._running = false;
      this._time = 0;
    }
  }, {
    key: "play",
    value: function play() {
      if (!this._paused && this._running) return; // prevent multiple calls

      this._paused = false;
      this.autoplayNext();
    }
  }, {
    key: "autoplayNext",
    value: function autoplayNext() {
      return __awaiter(this, void 0, void 0,
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var index, stp;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._running) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                this._running = true;
                this._time = new Date().getTime(); // start timer

                index = this.nodes.indexOf(this.activeItem);

                if (this.options.progress) {
                  this.startProgress(index);
                } // sleep


                stp = 0;

              case 7:
                if (!(stp !== Math.round(Number(this._timeout) / 100))) {
                  _context2.next = 17;
                  break;
                }

                _context2.next = 10;
                return utils_1.timer(100);

              case 10:
                if (!(this._stop || this._paused)) {
                  _context2.next = 12;
                  break;
                }

                return _context2.abrupt("return");

              case 12:
                if (!document.hidden) {
                  _context2.next = 14;
                  break;
                }

                return _context2.abrupt("continue", 7);

              case 14:
                stp++;
                _context2.next = 7;
                break;

              case 17:
                this._running = false;
                this._timeout = this.options.autoplay;

                if (index !== this.maxArrayLength) {
                  this.nextItem();
                  this.autoplayNext();
                }

                if (this.options.loop && index === this.maxArrayLength) {
                  this.nextItem();
                  this.autoplay();
                }

              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this2 = this;

      this._stop = true;
      this._running = false;

      if (this.options.autoplay) {
        clearTimeout(this._call);
        this._call = setTimeout(function () {
          _this2.autoplay();
        }, 1000);
      }
    }
  }, {
    key: "createKey",
    value: function createKey() {
      for (var i = 0; i < this.maxLength; i++) {
        this.items[i].setAttribute('index', i.toString());
      }
    }
  }, {
    key: "buildHeight",
    value: function buildHeight() {
      var maxHeight = 0;

      for (var i = 0; i < this.maxLength; i++) {
        var height = this.items[i].getElementsByClassName('inner')[0].offsetHeight;
        if (height > maxHeight) maxHeight = height;
      }

      ;
      this.carousel.getElementsByClassName('carousel__items')[0].style.height = "".concat(maxHeight, "px");
    }
  }, {
    key: "createProgress",
    value: function createProgress() {
      var progress = document.createElement('div');
      progress.classList.add('progress');
      var progressEle = this.controller.appendChild(progress);

      for (var i = 0; i < this.maxLength; i++) {
        var newProgressBarItem = document.createElement('div');
        newProgressBarItem.classList.add('item');
        var inner = document.createElement('div');
        newProgressBarItem.appendChild(inner);
        progressEle.appendChild(newProgressBarItem);
      }
    }
  }, {
    key: "startProgress",
    value: function startProgress(index) {
      return __awaiter(this, void 0, void 0,
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        var timeoutPrecent, percent;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                timeoutPrecent = Math.round(Number(this._timeout) / Number(this.options.autoplay) * 100);
                percent = timeoutPrecent === 100 ? 0 : (timeoutPrecent - 100) * -1;

              case 2:
                if (!(percent <= 100)) {
                  _context3.next = 14;
                  break;
                }

                _context3.next = 5;
                return utils_1.timer(Number(this.options.autoplay) / 100);

              case 5:
                if (this._stop) {
                  this.moveProgress(0, index);
                }

                if (!document.hidden) {
                  _context3.next = 8;
                  break;
                }

                return _context3.abrupt("continue", 2);

              case 8:
                if (!(this._stop || this._paused)) {
                  _context3.next = 10;
                  break;
                }

                return _context3.abrupt("break", 14);

              case 10:
                this.moveProgress(percent, index);
                percent++;
                _context3.next = 2;
                break;

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
    }
  }, {
    key: "moveProgress",
    value: function moveProgress(percent, index) {
      var progressBar = this.controller.querySelectorAll('.progress .item')[index];
      var inner = progressBar.getElementsByTagName('div')[0];
      progressBar.classList.remove('transition');
      inner.style.width = "".concat(percent, "%");

      if (percent === 100) {
        progressBar.classList.add('transition');
        inner.style.width = '0%';
      }
    }
  }, {
    key: "createPrev",
    value: function createPrev() {
      var div = document.createElement('div');
      div.classList.add('prev');

      if (typeof this.options.prev === 'string') {
        div.innerHTML = this.options.prev;
      } else {
        div.innerText = '←';
      }

      this.controller.appendChild(div);
    }
  }, {
    key: "createNext",
    value: function createNext() {
      var div = document.createElement('div');
      div.classList.add('next');

      if (typeof this.options.next === 'string') {
        div.innerHTML = this.options.next;
      } else {
        div.innerText = '→';
      }

      this.controller.appendChild(div);
    }
  }, {
    key: "nextItem",
    value: function nextItem() {
      if (document.hidden) return;
      this.activeItem.classList.remove('active');
      var activeIndex = this.nodes.indexOf(this.activeItem);
      var nextIndex = activeIndex === this.maxArrayLength ? 0 : activeIndex + 1;
      var nextItem = this.items[nextIndex];
      nextItem.classList.add('active');
      this.activeItem = nextItem;
    }
  }, {
    key: "prevItem",
    value: function prevItem() {
      if (document.hidden) return;
      this.activeItem.classList.remove('active');
      var activeIndex = this.nodes.indexOf(this.activeItem);
      var prevIndex = activeIndex - 1 < 0 ? this.maxArrayLength : activeIndex - 1;
      var prevItem = this.items[prevIndex];
      prevItem.classList.add('active');
      this.activeItem = prevItem;
    }
  }]);

  return Carousel;
}();

exports["default"] = Carousel;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function timer(ms) {
  return new Promise(function (r) {
    return setTimeout(r, ms);
  });
}

exports.timer = timer;
//# sourceMappingURL=carousel.js.map
