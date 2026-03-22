import { c as createLucideIcon, R as React, a as clsx, r as reactExports, j as jsxRuntimeExports, u as useControllableState, b as createContextScope, d as useId, P as Primitive, e as composeEventHandlers, f as Presence, g as useComposedRefs, h as useLayoutEffect2, C as Category, i as Priority, k as useCreateTask, l as useUpdateTask, m as useTaskSuggestions, D as Dialog, n as DialogContent, o as DialogHeader, p as DialogTitle, q as DialogDescription, B as Button, S as Sparkles, L as Label$1, I as Input, s as DialogFooter, t as ue, v as createDialogScope, w as Root$1, W as WarningProvider, x as Content, y as createSlottable, T as Title, z as Description, A as Close, E as Portal, O as Overlay, F as Trigger, G as cn, H as buttonVariants, J as useToggleTaskCompletion, K as useDeleteTask, M as useTasksForDateRange, N as useTasksForDate, Q as useActor, U as useQuery, V as LoadingScreen, X as Link, Y as Crown, Z as TrendingUp } from "./index-DNhaUe03.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-wePoae7a.js";
import { t as toDate, C as CATEGORY_LABELS, s as startOfWeek, e as endOfWeek, f as format, a as eachDayOfInterval, c as calculateDailySummary, g as getTodayDateString, b as calculateCategoryScores, d as calculateStreaks, h as calculateWeeklySummary, i as getISOWeek } from "./taskCalculations-D8hNe8L4.js";
import { i as isFunction, C as Curve, T as Text, f as filterProps, p as polarToCartesian, a as isNil, L as Layer, g as getValueByDataKey, b as adaptEventsOfChild, S as Shape, A as Animate, c as get, d as interpolateNumber, e as isEqual, h as isNumber, j as Label, k as LabelList, u as uniqueId, G as Global, m as mathSign, l as findAllByType, n as Cell, o as getMaxRadius, q as getPercentValue, w as warn, r as generateCategoricalChart, B as Bar, s as formatAxisMap, t as formatAxisMap$1, R as ResponsiveContainer, v as Tooltip } from "./generateCategoricalChart-6f7O0m3i.js";
import { P as PolarAngleAxis, a as PolarRadiusAxis, R as RadarChart, b as PolarGrid, c as Radar } from "./RadarChart-CMWi7AUk.js";
import { P as Progress } from "./progress-DFYCpPit.js";
import { g as getRankFromTasks, a as getNextRank } from "./rankSystem-DY4uXM5k.js";
import { F as Flame, T as Target } from "./target-_qdi7SjK.js";
import { B as Badge } from "./badge-jRLyWhsA.js";
import { C as ChevronDown, P as Plus, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, T as Trash2 } from "./select-D0MtX6OR.js";
import { Z as Zap } from "./zap-D2hrnvXG.js";
import { C as Clock } from "./clock-CrEwo-u5.js";
import { C as Calendar } from "./calendar-DM5v9U_q.js";
import { A as AnimatePresence, m as motion } from "./proxy-z-o9TY40.js";
import { R as RefreshCw } from "./refresh-cw-CrFm8bHt.js";
import { X as XAxis, Y as YAxis, M as Minus } from "./YAxis-CVZRrbO9.js";
import { L as Lock } from "./lock-Dq5s_Bx6.js";
import "./check-Dy5rVNw2.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z",
      key: "9m4mmf"
    }
  ],
  ["path", { d: "m2.5 21.5 1.4-1.4", key: "17g3f0" }],
  ["path", { d: "m20.1 3.9 1.4-1.4", key: "1qn309" }],
  [
    "path",
    {
      d: "M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z",
      key: "1t2c92"
    }
  ],
  ["path", { d: "m9.6 14.4 4.8-4.8", key: "6umqxw" }]
];
const Dumbbell = createLucideIcon("dumbbell", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode);
function getYear(date) {
  return toDate(date).getFullYear();
}
var _Pie;
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var Pie = /* @__PURE__ */ function(_PureComponent) {
  function Pie2(props) {
    var _this;
    _classCallCheck(this, Pie2);
    _this = _callSuper(this, Pie2, [props]);
    _defineProperty(_this, "pieRef", null);
    _defineProperty(_this, "sectorRefs", []);
    _defineProperty(_this, "id", uniqueId("recharts-pie-"));
    _defineProperty(_this, "handleAnimationEnd", function() {
      var onAnimationEnd = _this.props.onAnimationEnd;
      _this.setState({
        isAnimationFinished: true
      });
      if (isFunction(onAnimationEnd)) {
        onAnimationEnd();
      }
    });
    _defineProperty(_this, "handleAnimationStart", function() {
      var onAnimationStart = _this.props.onAnimationStart;
      _this.setState({
        isAnimationFinished: false
      });
      if (isFunction(onAnimationStart)) {
        onAnimationStart();
      }
    });
    _this.state = {
      isAnimationFinished: !props.isAnimationActive,
      prevIsAnimationActive: props.isAnimationActive,
      prevAnimationId: props.animationId,
      sectorToFocus: 0
    };
    return _this;
  }
  _inherits(Pie2, _PureComponent);
  return _createClass(Pie2, [{
    key: "isActiveIndex",
    value: function isActiveIndex(i) {
      var activeIndex = this.props.activeIndex;
      if (Array.isArray(activeIndex)) {
        return activeIndex.indexOf(i) !== -1;
      }
      return i === activeIndex;
    }
  }, {
    key: "hasActiveIndex",
    value: function hasActiveIndex() {
      var activeIndex = this.props.activeIndex;
      return Array.isArray(activeIndex) ? activeIndex.length !== 0 : activeIndex || activeIndex === 0;
    }
  }, {
    key: "renderLabels",
    value: function renderLabels(sectors) {
      var isAnimationActive = this.props.isAnimationActive;
      if (isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }
      var _this$props = this.props, label = _this$props.label, labelLine = _this$props.labelLine, dataKey = _this$props.dataKey, valueKey = _this$props.valueKey;
      var pieProps = filterProps(this.props, false);
      var customLabelProps = filterProps(label, false);
      var customLabelLineProps = filterProps(labelLine, false);
      var offsetRadius = label && label.offsetRadius || 20;
      var labels = sectors.map(function(entry, i) {
        var midAngle = (entry.startAngle + entry.endAngle) / 2;
        var endPoint = polarToCartesian(entry.cx, entry.cy, entry.outerRadius + offsetRadius, midAngle);
        var labelProps = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, pieProps), entry), {}, {
          stroke: "none"
        }, customLabelProps), {}, {
          index: i,
          textAnchor: Pie2.getTextAnchor(endPoint.x, entry.cx)
        }, endPoint);
        var lineProps = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, pieProps), entry), {}, {
          fill: "none",
          stroke: entry.fill
        }, customLabelLineProps), {}, {
          index: i,
          points: [polarToCartesian(entry.cx, entry.cy, entry.outerRadius, midAngle), endPoint]
        });
        var realDataKey = dataKey;
        if (isNil(dataKey) && isNil(valueKey)) {
          realDataKey = "value";
        } else if (isNil(dataKey)) {
          realDataKey = valueKey;
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          /* @__PURE__ */ React.createElement(Layer, {
            key: "label-".concat(entry.startAngle, "-").concat(entry.endAngle, "-").concat(entry.midAngle, "-").concat(i)
          }, labelLine && Pie2.renderLabelLineItem(labelLine, lineProps, "line"), Pie2.renderLabelItem(label, labelProps, getValueByDataKey(entry, realDataKey)))
        );
      });
      return /* @__PURE__ */ React.createElement(Layer, {
        className: "recharts-pie-labels"
      }, labels);
    }
  }, {
    key: "renderSectorsStatically",
    value: function renderSectorsStatically(sectors) {
      var _this2 = this;
      var _this$props2 = this.props, activeShape = _this$props2.activeShape, blendStroke = _this$props2.blendStroke, inactiveShapeProp = _this$props2.inactiveShape;
      return sectors.map(function(entry, i) {
        if ((entry === null || entry === void 0 ? void 0 : entry.startAngle) === 0 && (entry === null || entry === void 0 ? void 0 : entry.endAngle) === 0 && sectors.length !== 1) return null;
        var isActive = _this2.isActiveIndex(i);
        var inactiveShape = inactiveShapeProp && _this2.hasActiveIndex() ? inactiveShapeProp : null;
        var sectorOptions = isActive ? activeShape : inactiveShape;
        var sectorProps = _objectSpread(_objectSpread({}, entry), {}, {
          stroke: blendStroke ? entry.fill : entry.stroke,
          tabIndex: -1
        });
        return /* @__PURE__ */ React.createElement(Layer, _extends({
          ref: function ref(_ref) {
            if (_ref && !_this2.sectorRefs.includes(_ref)) {
              _this2.sectorRefs.push(_ref);
            }
          },
          tabIndex: -1,
          className: "recharts-pie-sector"
        }, adaptEventsOfChild(_this2.props, entry, i), {
          // eslint-disable-next-line react/no-array-index-key
          key: "sector-".concat(entry === null || entry === void 0 ? void 0 : entry.startAngle, "-").concat(entry === null || entry === void 0 ? void 0 : entry.endAngle, "-").concat(entry.midAngle, "-").concat(i)
        }), /* @__PURE__ */ React.createElement(Shape, _extends({
          option: sectorOptions,
          isActive,
          shapeType: "sector"
        }, sectorProps)));
      });
    }
  }, {
    key: "renderSectorsWithAnimation",
    value: function renderSectorsWithAnimation() {
      var _this3 = this;
      var _this$props3 = this.props, sectors = _this$props3.sectors, isAnimationActive = _this$props3.isAnimationActive, animationBegin = _this$props3.animationBegin, animationDuration = _this$props3.animationDuration, animationEasing = _this$props3.animationEasing, animationId = _this$props3.animationId;
      var _this$state = this.state, prevSectors = _this$state.prevSectors, prevIsAnimationActive = _this$state.prevIsAnimationActive;
      return /* @__PURE__ */ React.createElement(Animate, {
        begin: animationBegin,
        duration: animationDuration,
        isActive: isAnimationActive,
        easing: animationEasing,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "pie-".concat(animationId, "-").concat(prevIsAnimationActive),
        onAnimationStart: this.handleAnimationStart,
        onAnimationEnd: this.handleAnimationEnd
      }, function(_ref2) {
        var t = _ref2.t;
        var stepData = [];
        var first = sectors && sectors[0];
        var curAngle = first.startAngle;
        sectors.forEach(function(entry, index) {
          var prev = prevSectors && prevSectors[index];
          var paddingAngle = index > 0 ? get(entry, "paddingAngle", 0) : 0;
          if (prev) {
            var angleIp = interpolateNumber(prev.endAngle - prev.startAngle, entry.endAngle - entry.startAngle);
            var latest = _objectSpread(_objectSpread({}, entry), {}, {
              startAngle: curAngle + paddingAngle,
              endAngle: curAngle + angleIp(t) + paddingAngle
            });
            stepData.push(latest);
            curAngle = latest.endAngle;
          } else {
            var endAngle = entry.endAngle, startAngle = entry.startAngle;
            var interpolatorAngle = interpolateNumber(0, endAngle - startAngle);
            var deltaAngle = interpolatorAngle(t);
            var _latest = _objectSpread(_objectSpread({}, entry), {}, {
              startAngle: curAngle + paddingAngle,
              endAngle: curAngle + deltaAngle + paddingAngle
            });
            stepData.push(_latest);
            curAngle = _latest.endAngle;
          }
        });
        return /* @__PURE__ */ React.createElement(Layer, null, _this3.renderSectorsStatically(stepData));
      });
    }
  }, {
    key: "attachKeyboardHandlers",
    value: function attachKeyboardHandlers(pieRef) {
      var _this4 = this;
      pieRef.onkeydown = function(e) {
        if (!e.altKey) {
          switch (e.key) {
            case "ArrowLeft": {
              var next = ++_this4.state.sectorToFocus % _this4.sectorRefs.length;
              _this4.sectorRefs[next].focus();
              _this4.setState({
                sectorToFocus: next
              });
              break;
            }
            case "ArrowRight": {
              var _next = --_this4.state.sectorToFocus < 0 ? _this4.sectorRefs.length - 1 : _this4.state.sectorToFocus % _this4.sectorRefs.length;
              _this4.sectorRefs[_next].focus();
              _this4.setState({
                sectorToFocus: _next
              });
              break;
            }
            case "Escape": {
              _this4.sectorRefs[_this4.state.sectorToFocus].blur();
              _this4.setState({
                sectorToFocus: 0
              });
              break;
            }
          }
        }
      };
    }
  }, {
    key: "renderSectors",
    value: function renderSectors() {
      var _this$props4 = this.props, sectors = _this$props4.sectors, isAnimationActive = _this$props4.isAnimationActive;
      var prevSectors = this.state.prevSectors;
      if (isAnimationActive && sectors && sectors.length && (!prevSectors || !isEqual(prevSectors, sectors))) {
        return this.renderSectorsWithAnimation();
      }
      return this.renderSectorsStatically(sectors);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.pieRef) {
        this.attachKeyboardHandlers(this.pieRef);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;
      var _this$props5 = this.props, hide = _this$props5.hide, sectors = _this$props5.sectors, className = _this$props5.className, label = _this$props5.label, cx = _this$props5.cx, cy = _this$props5.cy, innerRadius = _this$props5.innerRadius, outerRadius = _this$props5.outerRadius, isAnimationActive = _this$props5.isAnimationActive;
      var isAnimationFinished = this.state.isAnimationFinished;
      if (hide || !sectors || !sectors.length || !isNumber(cx) || !isNumber(cy) || !isNumber(innerRadius) || !isNumber(outerRadius)) {
        return null;
      }
      var layerClass = clsx("recharts-pie", className);
      return /* @__PURE__ */ React.createElement(Layer, {
        tabIndex: this.props.rootTabIndex,
        className: layerClass,
        ref: function ref(_ref3) {
          _this5.pieRef = _ref3;
        }
      }, this.renderSectors(), label && this.renderLabels(sectors), Label.renderCallByParent(this.props, null, false), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, sectors, false));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (prevState.prevIsAnimationActive !== nextProps.isAnimationActive) {
        return {
          prevIsAnimationActive: nextProps.isAnimationActive,
          prevAnimationId: nextProps.animationId,
          curSectors: nextProps.sectors,
          prevSectors: [],
          isAnimationFinished: true
        };
      }
      if (nextProps.isAnimationActive && nextProps.animationId !== prevState.prevAnimationId) {
        return {
          prevAnimationId: nextProps.animationId,
          curSectors: nextProps.sectors,
          prevSectors: prevState.curSectors,
          isAnimationFinished: true
        };
      }
      if (nextProps.sectors !== prevState.curSectors) {
        return {
          curSectors: nextProps.sectors,
          isAnimationFinished: true
        };
      }
      return null;
    }
  }, {
    key: "getTextAnchor",
    value: function getTextAnchor(x, cx) {
      if (x > cx) {
        return "start";
      }
      if (x < cx) {
        return "end";
      }
      return "middle";
    }
  }, {
    key: "renderLabelLineItem",
    value: function renderLabelLineItem(option, props, key) {
      if (/* @__PURE__ */ React.isValidElement(option)) {
        return /* @__PURE__ */ React.cloneElement(option, props);
      }
      if (isFunction(option)) {
        return option(props);
      }
      var className = clsx("recharts-pie-label-line", typeof option !== "boolean" ? option.className : "");
      return /* @__PURE__ */ React.createElement(Curve, _extends({}, props, {
        key,
        type: "linear",
        className
      }));
    }
  }, {
    key: "renderLabelItem",
    value: function renderLabelItem(option, props, value) {
      if (/* @__PURE__ */ React.isValidElement(option)) {
        return /* @__PURE__ */ React.cloneElement(option, props);
      }
      var label = value;
      if (isFunction(option)) {
        label = option(props);
        if (/* @__PURE__ */ React.isValidElement(label)) {
          return label;
        }
      }
      var className = clsx("recharts-pie-label-text", typeof option !== "boolean" && !isFunction(option) ? option.className : "");
      return /* @__PURE__ */ React.createElement(Text, _extends({}, props, {
        alignmentBaseline: "middle",
        className
      }), label);
    }
  }]);
}(reactExports.PureComponent);
_Pie = Pie;
_defineProperty(Pie, "displayName", "Pie");
_defineProperty(Pie, "defaultProps", {
  stroke: "#fff",
  fill: "#808080",
  legendType: "rect",
  cx: "50%",
  cy: "50%",
  startAngle: 0,
  endAngle: 360,
  innerRadius: 0,
  outerRadius: "80%",
  paddingAngle: 0,
  labelLine: true,
  hide: false,
  minAngle: 0,
  isAnimationActive: !Global.isSsr,
  animationBegin: 400,
  animationDuration: 1500,
  animationEasing: "ease",
  nameKey: "name",
  blendStroke: false,
  rootTabIndex: 0
});
_defineProperty(Pie, "parseDeltaAngle", function(startAngle, endAngle) {
  var sign = mathSign(endAngle - startAngle);
  var deltaAngle = Math.min(Math.abs(endAngle - startAngle), 360);
  return sign * deltaAngle;
});
_defineProperty(Pie, "getRealPieData", function(itemProps) {
  var data = itemProps.data, children = itemProps.children;
  var presentationProps = filterProps(itemProps, false);
  var cells = findAllByType(children, Cell);
  if (data && data.length) {
    return data.map(function(entry, index) {
      return _objectSpread(_objectSpread(_objectSpread({
        payload: entry
      }, presentationProps), entry), cells && cells[index] && cells[index].props);
    });
  }
  if (cells && cells.length) {
    return cells.map(function(cell) {
      return _objectSpread(_objectSpread({}, presentationProps), cell.props);
    });
  }
  return [];
});
_defineProperty(Pie, "parseCoordinateOfPie", function(itemProps, offset) {
  var top = offset.top, left = offset.left, width = offset.width, height = offset.height;
  var maxPieRadius = getMaxRadius(width, height);
  var cx = left + getPercentValue(itemProps.cx, width, width / 2);
  var cy = top + getPercentValue(itemProps.cy, height, height / 2);
  var innerRadius = getPercentValue(itemProps.innerRadius, maxPieRadius, 0);
  var outerRadius = getPercentValue(itemProps.outerRadius, maxPieRadius, maxPieRadius * 0.8);
  var maxRadius = itemProps.maxRadius || Math.sqrt(width * width + height * height) / 2;
  return {
    cx,
    cy,
    innerRadius,
    outerRadius,
    maxRadius
  };
});
_defineProperty(Pie, "getComposedData", function(_ref4) {
  var item = _ref4.item, offset = _ref4.offset;
  var itemProps = item.type.defaultProps !== void 0 ? _objectSpread(_objectSpread({}, item.type.defaultProps), item.props) : item.props;
  var pieData = _Pie.getRealPieData(itemProps);
  if (!pieData || !pieData.length) {
    return null;
  }
  var cornerRadius = itemProps.cornerRadius, startAngle = itemProps.startAngle, endAngle = itemProps.endAngle, paddingAngle = itemProps.paddingAngle, dataKey = itemProps.dataKey, nameKey = itemProps.nameKey, valueKey = itemProps.valueKey, tooltipType = itemProps.tooltipType;
  var minAngle = Math.abs(itemProps.minAngle);
  var coordinate = _Pie.parseCoordinateOfPie(itemProps, offset);
  var deltaAngle = _Pie.parseDeltaAngle(startAngle, endAngle);
  var absDeltaAngle = Math.abs(deltaAngle);
  var realDataKey = dataKey;
  if (isNil(dataKey) && isNil(valueKey)) {
    warn(false, 'Use "dataKey" to specify the value of pie,\n      the props "valueKey" will be deprecated in 1.1.0');
    realDataKey = "value";
  } else if (isNil(dataKey)) {
    warn(false, 'Use "dataKey" to specify the value of pie,\n      the props "valueKey" will be deprecated in 1.1.0');
    realDataKey = valueKey;
  }
  var notZeroItemCount = pieData.filter(function(entry) {
    return getValueByDataKey(entry, realDataKey, 0) !== 0;
  }).length;
  var totalPadingAngle = (absDeltaAngle >= 360 ? notZeroItemCount : notZeroItemCount - 1) * paddingAngle;
  var realTotalAngle = absDeltaAngle - notZeroItemCount * minAngle - totalPadingAngle;
  var sum = pieData.reduce(function(result, entry) {
    var val = getValueByDataKey(entry, realDataKey, 0);
    return result + (isNumber(val) ? val : 0);
  }, 0);
  var sectors;
  if (sum > 0) {
    var prev;
    sectors = pieData.map(function(entry, i) {
      var val = getValueByDataKey(entry, realDataKey, 0);
      var name = getValueByDataKey(entry, nameKey, i);
      var percent = (isNumber(val) ? val : 0) / sum;
      var tempStartAngle;
      if (i) {
        tempStartAngle = prev.endAngle + mathSign(deltaAngle) * paddingAngle * (val !== 0 ? 1 : 0);
      } else {
        tempStartAngle = startAngle;
      }
      var tempEndAngle = tempStartAngle + mathSign(deltaAngle) * ((val !== 0 ? minAngle : 0) + percent * realTotalAngle);
      var midAngle = (tempStartAngle + tempEndAngle) / 2;
      var middleRadius = (coordinate.innerRadius + coordinate.outerRadius) / 2;
      var tooltipPayload = [{
        name,
        value: val,
        payload: entry,
        dataKey: realDataKey,
        type: tooltipType
      }];
      var tooltipPosition = polarToCartesian(coordinate.cx, coordinate.cy, middleRadius, midAngle);
      prev = _objectSpread(_objectSpread(_objectSpread({
        percent,
        cornerRadius,
        name,
        tooltipPayload,
        midAngle,
        middleRadius,
        tooltipPosition
      }, entry), coordinate), {}, {
        value: getValueByDataKey(entry, realDataKey),
        startAngle: tempStartAngle,
        endAngle: tempEndAngle,
        payload: entry,
        paddingAngle: mathSign(deltaAngle) * paddingAngle
      });
      return prev;
    });
  }
  return _objectSpread(_objectSpread({}, coordinate), {}, {
    sectors,
    data: pieData
  });
});
var BarChart = generateCategoricalChart({
  chartName: "BarChart",
  GraphicalChild: Bar,
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: ["axis", "item"],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: XAxis
  }, {
    axisType: "yAxis",
    AxisComp: YAxis
  }],
  formatAxisMap
});
var PieChart = generateCategoricalChart({
  chartName: "PieChart",
  GraphicalChild: Pie,
  validateTooltipEventTypes: ["item"],
  defaultTooltipEventType: "item",
  legendContent: "children",
  axisComponents: [{
    axisType: "angleAxis",
    AxisComp: PolarAngleAxis
  }, {
    axisType: "radiusAxis",
    AxisComp: PolarRadiusAxis
  }],
  formatAxisMap: formatAxisMap$1,
  defaultProps: {
    layout: "centric",
    startAngle: 0,
    endAngle: 360,
    cx: "50%",
    cy: "50%",
    innerRadius: 0,
    outerRadius: "80%"
  }
});
function CategoryRadarChart({
  categoryScores
}) {
  const chartData = categoryScores.filter((cs) => cs.totalTasks > 0).map((cs) => ({
    category: CATEGORY_LABELS[cs.category],
    score: cs.completionRate,
    fullMark: 100
  }));
  if (chartData.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Category Balance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Visual breakdown of your productivity across categories" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "flex h-[300px] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No tasks yet. Start adding tasks to see your balance!" }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Category Balance" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Visual breakdown of your productivity across categories" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(RadarChart, { data: chartData, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PolarGrid,
        {
          stroke: "hsl(var(--foreground) / 0.2)",
          strokeWidth: 1,
          gridType: "polygon"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PolarAngleAxis,
        {
          dataKey: "category",
          tick: { fill: "hsl(var(--foreground))", fontSize: 12 }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PolarRadiusAxis,
        {
          angle: 90,
          domain: [0, 100],
          tick: { fill: "hsl(var(--muted-foreground))", fontSize: 10 },
          tickCount: 6,
          axisLine: false
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Radar,
        {
          name: "Completion %",
          dataKey: "score",
          stroke: "hsl(var(--primary))",
          fill: "hsl(var(--primary))",
          fillOpacity: 0.6,
          strokeWidth: 2
        }
      )
    ] }) }) })
  ] });
}
function RankCard({
  totalCompletedTasks,
  compact = false
}) {
  const rank = getRankFromTasks(totalCompletedTasks);
  const nextRank = getNextRank(rank);
  const progress = nextRank ? Math.round(
    (totalCompletedTasks - rank.minTasks) / (nextRank.minTasks - rank.minTasks) * 100
  ) : 100;
  if (compact) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: rank.image,
          alt: rank.name,
          className: "h-8 w-8 object-contain",
          style: { filter: `drop-shadow(0 0 6px ${rank.glowColor})` }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-bold text-sm ${rank.color}`, children: rank.name })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      style: {
        borderColor: `${rank.glowColor}30`,
        background: `linear-gradient(135deg, ${rank.glowColor}08 0%, transparent 60%)`
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-lg flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🏆" }),
          "Rank"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: rank.image,
                alt: rank.name,
                className: "h-16 w-16 object-contain",
                style: {
                  filter: `drop-shadow(0 0 12px ${rank.glowColor}) drop-shadow(0 0 24px ${rank.glowColor}80)`
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `text-2xl font-extrabold tracking-tight ${rank.color}`,
                  children: rank.name
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                totalCompletedTasks,
                " tasks completed"
              ] })
            ] })
          ] }),
          nextRank ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Progress,
              {
                value: progress,
                className: "h-1.5",
                style: {
                  // @ts-ignore
                  "--progress-color": rank.glowColor
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
              nextRank.minTasks - totalCompletedTasks,
              " tasks to",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: nextRank.color, children: nextRank.name })
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-center text-xs font-semibold",
              style: { color: rank.glowColor },
              children: "Maximum rank achieved! 🔱"
            }
          )
        ] })
      ]
    }
  );
}
function StreakDisplay({ streakInfo }) {
  const { currentStreak, longestStreak, categoryStreaks } = streakInfo;
  const getStreakMessage = () => {
    if (currentStreak === 0) return "Start your streak today!";
    if (currentStreak === 1) return "Great start! Keep it up!";
    if (currentStreak < 7) return "You're building momentum!";
    if (currentStreak < 30) return "Amazing consistency!";
    return "You're unstoppable! 🔥";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-2 border-accent/20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-5 w-5 text-accent" }),
        "Streak"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: getStreakMessage() })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-12 w-12 animate-pulse text-accent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl font-bold tabular-nums text-accent", children: currentStreak })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
          "Current streak · Best: ",
          longestStreak,
          " ",
          longestStreak === 1 ? "day" : "days"
        ] })
      ] }) }),
      categoryStreaks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 border-t pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium", children: "Category Streaks" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: categoryStreaks.map((cs) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between rounded-md bg-secondary/50 px-3 py-2 text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: CATEGORY_LABELS[cs.category] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-accent", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-3.5 w-3.5" }),
                cs.streak
              ] })
            ]
          },
          cs.category
        )) })
      ] })
    ] })
  ] });
}
var COLLAPSIBLE_NAME = "Collapsible";
var [createCollapsibleContext] = createContextScope(COLLAPSIBLE_NAME);
var [CollapsibleProvider, useCollapsibleContext] = createCollapsibleContext(COLLAPSIBLE_NAME);
var Collapsible$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCollapsible,
      open: openProp,
      defaultOpen,
      disabled,
      onOpenChange,
      ...collapsibleProps
    } = props;
    const [open, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen ?? false,
      onChange: onOpenChange,
      caller: COLLAPSIBLE_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CollapsibleProvider,
      {
        scope: __scopeCollapsible,
        disabled,
        contentId: useId(),
        open,
        onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            "data-state": getState(open),
            "data-disabled": disabled ? "" : void 0,
            ...collapsibleProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Collapsible$1.displayName = COLLAPSIBLE_NAME;
var TRIGGER_NAME$1 = "CollapsibleTrigger";
var CollapsibleTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCollapsible, ...triggerProps } = props;
    const context = useCollapsibleContext(TRIGGER_NAME$1, __scopeCollapsible);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        "aria-controls": context.contentId,
        "aria-expanded": context.open || false,
        "data-state": getState(context.open),
        "data-disabled": context.disabled ? "" : void 0,
        disabled: context.disabled,
        ...triggerProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
  }
);
CollapsibleTrigger$1.displayName = TRIGGER_NAME$1;
var CONTENT_NAME$1 = "CollapsibleContent";
var CollapsibleContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...contentProps } = props;
    const context = useCollapsibleContext(CONTENT_NAME$1, props.__scopeCollapsible);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleContentImpl, { ...contentProps, ref: forwardedRef, present }) });
  }
);
CollapsibleContent$1.displayName = CONTENT_NAME$1;
var CollapsibleContentImpl = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeCollapsible, present, children, ...contentProps } = props;
  const context = useCollapsibleContext(CONTENT_NAME$1, __scopeCollapsible);
  const [isPresent, setIsPresent] = reactExports.useState(present);
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const heightRef = reactExports.useRef(0);
  const height = heightRef.current;
  const widthRef = reactExports.useRef(0);
  const width = widthRef.current;
  const isOpen = context.open || isPresent;
  const isMountAnimationPreventedRef = reactExports.useRef(isOpen);
  const originalStylesRef = reactExports.useRef(void 0);
  reactExports.useEffect(() => {
    const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
    return () => cancelAnimationFrame(rAF);
  }, []);
  useLayoutEffect2(() => {
    const node = ref.current;
    if (node) {
      originalStylesRef.current = originalStylesRef.current || {
        transitionDuration: node.style.transitionDuration,
        animationName: node.style.animationName
      };
      node.style.transitionDuration = "0s";
      node.style.animationName = "none";
      const rect = node.getBoundingClientRect();
      heightRef.current = rect.height;
      widthRef.current = rect.width;
      if (!isMountAnimationPreventedRef.current) {
        node.style.transitionDuration = originalStylesRef.current.transitionDuration;
        node.style.animationName = originalStylesRef.current.animationName;
      }
      setIsPresent(present);
    }
  }, [context.open, present]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-state": getState(context.open),
      "data-disabled": context.disabled ? "" : void 0,
      id: context.contentId,
      hidden: !isOpen,
      ...contentProps,
      ref: composedRefs,
      style: {
        [`--radix-collapsible-content-height`]: height ? `${height}px` : void 0,
        [`--radix-collapsible-content-width`]: width ? `${width}px` : void 0,
        ...props.style
      },
      children: isOpen && children
    }
  );
});
function getState(open) {
  return open ? "open" : "closed";
}
var Root = Collapsible$1;
function Collapsible({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "collapsible", ...props });
}
function CollapsibleTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CollapsibleTrigger$1,
    {
      "data-slot": "collapsible-trigger",
      ...props
    }
  );
}
function CollapsibleContent({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CollapsibleContent$1,
    {
      "data-slot": "collapsible-content",
      ...props
    }
  );
}
const CATEGORIES = [
  Category.study,
  Category.fitness,
  Category.health,
  Category.work,
  Category.personalDevelopment,
  Category.social,
  Category.other
];
const PRIORITIES = [Priority.low, Priority.medium, Priority.high];
const CATEGORY_ICONS = {
  [Category.study]: "📚",
  [Category.fitness]: "💪",
  [Category.health]: "🏥",
  [Category.work]: "💼",
  [Category.personalDevelopment]: "🌱",
  [Category.social]: "👥",
  [Category.other]: "📋"
};
function TaskFormDialog({
  open,
  onOpenChange,
  date,
  task
}) {
  const [name, setName] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState(Category.other);
  const [priority, setPriority] = reactExports.useState(Priority.medium);
  const [duration, setDuration] = reactExports.useState("");
  const [showAiSuggestions, setShowAiSuggestions] = reactExports.useState(false);
  const createMutation = useCreateTask();
  const updateMutation = useUpdateTask();
  const {
    data: suggestions = [],
    isLoading: suggestionsLoading,
    refetch: refetchSuggestions
  } = useTaskSuggestions();
  reactExports.useEffect(() => {
    if (task) {
      setName(task.name);
      setCategory(task.category);
      setPriority(task.priority);
      setDuration(
        task.estimatedDuration > 0n ? String(task.estimatedDuration) : ""
      );
      setShowAiSuggestions(false);
    } else {
      setName("");
      setCategory(Category.other);
      setPriority(Priority.medium);
      setDuration("");
      setShowAiSuggestions(false);
    }
  }, [task]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      ue.error("Please enter a task name");
      return;
    }
    const estimatedDuration = duration ? BigInt(Number.parseInt(duration, 10)) : 0n;
    if (task) {
      updateMutation.mutate(
        {
          taskId: task.id,
          name: name.trim(),
          category,
          priority,
          estimatedDuration,
          date
        },
        {
          onSuccess: () => {
            ue.success("Task updated");
            onOpenChange(false);
          },
          onError: () => {
            ue.error("Failed to update task");
          }
        }
      );
    } else {
      createMutation.mutate(
        {
          name: name.trim(),
          category,
          priority,
          estimatedDuration,
          date
        },
        {
          onSuccess: () => {
            ue.success("Task created");
            onOpenChange(false);
            setName("");
            setCategory(Category.other);
            setPriority(Priority.medium);
            setDuration("");
          },
          onError: () => {
            ue.error("Failed to create task");
          }
        }
      );
    }
  };
  const handleApplySuggestion = (suggestion) => {
    setName(suggestion.name);
    setCategory(suggestion.category);
    setPriority(suggestion.priority);
    setDuration(
      suggestion.estimatedDuration > 0n ? String(suggestion.estimatedDuration) : ""
    );
    setShowAiSuggestions(false);
    ue.success("Suggestion applied! Review and save.");
  };
  const getPriorityColor = (p) => {
    switch (p) {
      case Priority.high:
        return "bg-destructive/10 text-destructive border-destructive/30";
      case Priority.medium:
        return "bg-accent/10 text-accent-foreground border-accent/30";
      case Priority.low:
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };
  const getCategoryColor = (cat) => {
    const colors = {
      [Category.study]: "bg-chart-1/20 text-chart-1 border-chart-1/30",
      [Category.fitness]: "bg-chart-2/20 text-chart-2 border-chart-2/30",
      [Category.health]: "bg-chart-3/20 text-chart-3 border-chart-3/30",
      [Category.work]: "bg-chart-4/20 text-chart-4 border-chart-4/30",
      [Category.personalDevelopment]: "bg-chart-5/20 text-chart-5 border-chart-5/30",
      [Category.social]: "bg-chart-6/20 text-chart-6 border-chart-6/30",
      [Category.other]: "bg-chart-7/20 text-chart-7 border-chart-7/30"
    };
    return colors[cat];
  };
  const isPending = createMutation.isPending || updateMutation.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-[600px] max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "flex items-center gap-2 text-2xl", children: task ? "Edit Task" : "Create New Task" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: task ? "Update the task details below." : "Add a new task to your daily routine." })
    ] }),
    !task && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Collapsible,
      {
        open: showAiSuggestions,
        onOpenChange: setShowAiSuggestions,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              className: "w-full gap-2 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10 transition-all",
              onClick: () => {
                if (!showAiSuggestions) {
                  refetchSuggestions();
                }
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-primary" }),
                "Suggestions to get you started with",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ChevronDown,
                  {
                    className: `h-4 w-4 ml-auto transition-transform ${showAiSuggestions ? "rotate-180" : ""}`
                  }
                )
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleContent, { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 space-y-3", children: suggestionsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" }) }) : suggestions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-6 text-sm text-muted-foreground", children: "No suggestions available. Try again later!" }) : suggestions.slice(0, 3).map((suggestion) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "group rounded-lg border bg-card/50 p-3 space-y-2 hover:bg-card hover:shadow-sm transition-all",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: suggestion.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        variant: "outline",
                        className: `text-xs ${getCategoryColor(suggestion.category)}`,
                        children: [
                          CATEGORY_ICONS[suggestion.category],
                          " ",
                          CATEGORY_LABELS[suggestion.category]
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        variant: "outline",
                        className: `text-xs ${getPriorityColor(suggestion.priority)}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3 w-3 mr-1" }),
                          suggestion.priority
                        ]
                      }
                    ),
                    suggestion.estimatedDuration > 0n && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        variant: "outline",
                        className: "text-xs bg-muted",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3 mr-1" }),
                          String(suggestion.estimatedDuration),
                          " min"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: suggestion.reason })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    variant: "default",
                    onClick: () => handleApplySuggestion(suggestion),
                    className: "shrink-0",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3 mr-1" }),
                      "Use"
                    ]
                  }
                )
              ] })
            },
            suggestion.name
          )) }) }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-2 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "name", className: "text-base font-semibold", children: "Task Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "name",
              placeholder: "e.g., Morning workout",
              value: name,
              onChange: (e) => setName(e.target.value),
              disabled: isPending,
              className: "text-base border-2 focus:border-primary transition-colors"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "category", className: "text-base font-semibold", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: category,
                onValueChange: (value) => setCategory(value),
                disabled: isPending,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      id: "category",
                      className: "border-2 focus:border-primary",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cat, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: CATEGORY_ICONS[cat] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: CATEGORY_LABELS[cat] })
                  ] }) }, cat)) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: `${getCategoryColor(category)} mt-1`,
                children: [
                  CATEGORY_ICONS[category],
                  " ",
                  CATEGORY_LABELS[category]
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label$1, { htmlFor: "priority", className: "text-base font-semibold", children: "Priority" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Select,
              {
                value: priority,
                onValueChange: (value) => setPriority(value),
                disabled: isPending,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      id: "priority",
                      className: "border-2 focus:border-primary",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: PRIORITIES.map((pri) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: pri, children: pri.charAt(0).toUpperCase() + pri.slice(1) }, pri)) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: `${getPriorityColor(priority)} mt-1`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3 w-3 mr-1" }),
                  priority.toUpperCase()
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Label$1,
            {
              htmlFor: "duration",
              className: "text-base font-semibold flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }),
                "Estimated Duration (minutes)"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "duration",
              type: "number",
              min: "0",
              placeholder: "Optional",
              value: duration,
              onChange: (e) => setDuration(e.target.value),
              disabled: isPending,
              className: "text-base border-2 focus:border-primary transition-colors"
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => onOpenChange(false),
            disabled: isPending,
            className: "flex-1 sm:flex-none",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: isPending,
            className: "flex-1 sm:flex-none gap-2",
            children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" }),
              "Saving..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              task ? "Update Task" : "Create Task"
            ] })
          }
        )
      ] })
    ] })
  ] }) });
}
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext] = createContextScope(ROOT_NAME, [
  createDialogScope
]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = (props) => {
  const { __scopeAlertDialog, ...alertDialogProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root$1, { ...dialogScope, ...alertDialogProps, modal: true });
};
AlertDialog$1.displayName = ROOT_NAME;
var TRIGGER_NAME = "AlertDialogTrigger";
var AlertDialogTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...triggerProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { ...dialogScope, ...triggerProps, ref: forwardedRef });
  }
);
AlertDialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
  const { __scopeAlertDialog, ...portalProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { ...dialogScope, ...portalProps });
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...overlayProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Overlay, { ...dialogScope, ...overlayProps, ref: forwardedRef });
  }
);
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var Slottable = createSlottable("AlertDialogContent");
var AlertDialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, children, ...contentProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const cancelRef = reactExports.useRef(null);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      WarningProvider,
      {
        contentName: CONTENT_NAME,
        titleName: TITLE_NAME,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogContentProvider, { scope: __scopeAlertDialog, cancelRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Content,
          {
            role: "alertdialog",
            ...dialogScope,
            ...contentProps,
            ref: composedRefs,
            onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
              var _a;
              event.preventDefault();
              (_a = cancelRef.current) == null ? void 0 : _a.focus({ preventScroll: true });
            }),
            onPointerDownOutside: (event) => event.preventDefault(),
            onInteractOutside: (event) => event.preventDefault(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slottable, { children }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef })
            ]
          }
        ) })
      }
    );
  }
);
AlertDialogContent$1.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...titleProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { ...dialogScope, ...titleProps, ref: forwardedRef });
  }
);
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeAlertDialog, ...descriptionProps } = props;
  const dialogScope = useDialogScope(__scopeAlertDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Description, { ...dialogScope, ...descriptionProps, ref: forwardedRef });
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...actionProps } = props;
    const dialogScope = useDialogScope(__scopeAlertDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...actionProps, ref: forwardedRef });
  }
);
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAlertDialog, ...cancelProps } = props;
    const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
    const dialogScope = useDialogScope(__scopeAlertDialog);
    const ref = useComposedRefs(forwardedRef, cancelRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Close, { ...dialogScope, ...cancelProps, ref });
  }
);
AlertDialogCancel$1.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
  const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
  reactExports.useEffect(() => {
    var _a;
    const hasDescription = document.getElementById(
      (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby")
    );
    if (!hasDescription) console.warn(MESSAGE);
  }, [MESSAGE, contentRef]);
  return null;
};
var Root2 = AlertDialog$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay2,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Content2,
      {
        "data-slot": "alert-dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title2,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description2,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Action,
    {
      className: cn(buttonVariants(), className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}
const PRIORITY_COLORS = {
  high: "text-destructive",
  medium: "text-accent",
  low: "text-muted-foreground"
};
function TaskItem({ task, onEdit }) {
  const [showDeleteDialog, setShowDeleteDialog] = reactExports.useState(false);
  const toggleMutation = useToggleTaskCompletion();
  const deleteMutation = useDeleteTask();
  const handleToggle = () => {
    toggleMutation.mutate(
      { taskId: task.id, date: task.date },
      {
        onSuccess: () => {
          ue.success(
            task.completed ? "Task marked incomplete" : "Task completed! 🎉"
          );
        },
        onError: () => {
          ue.error("Failed to update task");
        }
      }
    );
  };
  const handleDelete = () => {
    deleteMutation.mutate(
      { taskId: task.id, date: task.date },
      {
        onSuccess: () => {
          ue.success("Task deleted");
          setShowDeleteDialog(false);
        },
        onError: () => {
          ue.error("Failed to delete task");
        }
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md ${task.completed ? "opacity-60" : ""} animate-slide-in`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleToggle,
              disabled: toggleMutation.isPending,
              className: "mt-0.5 shrink-0 transition-transform hover:scale-110 disabled:opacity-50",
              children: task.completed ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-6 w-6 animate-check-bounce text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-6 w-6 text-muted-foreground" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h3",
              {
                className: `text-base font-medium transition-all ${task.completed ? "line-through" : ""}`,
                children: task.name
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium", children: CATEGORY_LABELS[task.category] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-xs font-medium ${PRIORITY_COLORS[task.priority]}`,
                  children: task.priority.toUpperCase()
                }
              ),
              task.estimatedDuration > 0n && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                Number(task.estimatedDuration),
                " min"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 opacity-0 transition-opacity group-hover:opacity-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-8 w-8",
                onClick: () => onEdit(task),
                disabled: toggleMutation.isPending || deleteMutation.isPending,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-8 w-8 text-destructive hover:text-destructive",
                onClick: () => setShowDeleteDialog(true),
                disabled: toggleMutation.isPending || deleteMutation.isPending,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: showDeleteDialog, onOpenChange: setShowDeleteDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete Task" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          'Are you sure you want to delete "',
          task.name,
          '"? This action cannot be undone.'
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            onClick: handleDelete,
            className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            children: "Delete"
          }
        )
      ] })
    ] }) })
  ] });
}
function WeeklyTaskCalendar() {
  const weekStart = startOfWeek(/* @__PURE__ */ new Date(), { weekStartsOn: 1 });
  const weekEnd = endOfWeek(/* @__PURE__ */ new Date(), { weekStartsOn: 1 });
  const weekStartStr = format(weekStart, "yyyy-MM-dd");
  const weekEndStr = format(weekEnd, "yyyy-MM-dd");
  const { data: weekTasks = [], isLoading } = useTasksForDateRange(
    weekStartStr,
    weekEndStr
  );
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
  const todayStr = format(/* @__PURE__ */ new Date(), "yyyy-MM-dd");
  const getCompletionColor = (completionRate, totalTasks) => {
    if (totalTasks === 0) return "bg-muted/40 border-border/40";
    if (completionRate >= 90)
      return "bg-emerald-500/20 border-emerald-500/50 ring-1 ring-emerald-500/30";
    if (completionRate >= 70) return "bg-green-500/20 border-green-500/50";
    if (completionRate >= 50) return "bg-yellow-500/20 border-yellow-500/50";
    if (completionRate >= 30) return "bg-orange-500/20 border-orange-500/50";
    return "bg-red-500/20 border-red-500/50";
  };
  const getCompletionText = (completionRate, totalTasks) => {
    if (totalTasks === 0) return "No tasks";
    return `${completionRate}%`;
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Weekly Overview" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-2", children: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex flex-col items-center justify-center rounded-lg border-2 border-border/40 bg-muted/20 p-3 h-24 animate-pulse"
        },
        day
      )) }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Weekly Task Completion" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-2", children: days.map((day) => {
        const dateStr = format(day, "yyyy-MM-dd");
        const summary = calculateDailySummary(weekTasks, dateStr);
        const isToday = dateStr === todayStr;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "flex flex-col items-center justify-center rounded-lg border-2 p-2 sm:p-3 transition-all duration-200 hover:scale-105 cursor-pointer",
              getCompletionColor(summary.score, summary.totalTasks),
              isToday && "ring-2 ring-primary ring-offset-2 ring-offset-background"
            ),
            title: `${summary.completedTasks}/${summary.totalTasks} tasks completed`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wide", children: format(day, "EEE") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs sm:text-sm font-bold text-foreground mt-0.5 mb-1", children: format(day, "d") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "text-[10px] sm:text-xs font-semibold tabular-nums",
                    summary.totalTasks === 0 ? "text-muted-foreground" : "text-foreground"
                  ),
                  children: getCompletionText(summary.score, summary.totalTasks)
                }
              ),
              summary.totalTasks > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-[9px] sm:text-[10px] text-muted-foreground", children: [
                summary.completedTasks,
                "/",
                summary.totalTasks
              ] })
            ]
          },
          dateStr
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-3 rounded-sm bg-emerald-500/20 border border-emerald-500/50 ring-1 ring-emerald-500/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "90%+" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-3 rounded-sm bg-green-500/20 border border-green-500/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "70-89%" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-3 rounded-sm bg-yellow-500/20 border border-yellow-500/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "50-69%" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-3 rounded-sm bg-orange-500/20 border border-orange-500/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "30-49%" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-3 rounded-sm bg-red-500/20 border border-red-500/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "<30%" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-3 rounded-sm bg-muted/40 border border-border/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "No tasks" })
        ] })
      ] })
    ] })
  ] });
}
const LS_GOALS = "grindtracker_goals";
const LS_WEEK_TICKS = (weekKey) => `grindtracker_week_ticks_${weekKey}`;
const LS_REMINDER = "grindtracker_reminder_last";
function loadGoals() {
  try {
    const raw = localStorage.getItem(LS_GOALS);
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return { daily: 8, weekly: 40 };
}
function saveGoals(g) {
  localStorage.setItem(LS_GOALS, JSON.stringify(g));
}
function loadWeekTicks(weekKey) {
  try {
    const raw = localStorage.getItem(LS_WEEK_TICKS(weekKey));
    if (raw) return JSON.parse(raw);
  } catch {
  }
  return {};
}
function saveWeekTicks(weekKey, ticks) {
  localStorage.setItem(LS_WEEK_TICKS(weekKey), JSON.stringify(ticks));
}
function ScoreCircle({ score, size = 160 }) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - score / 100 * circumference;
  const cx = size / 2;
  const cy = size / 2;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: size,
      height: size,
      className: "-rotate-90",
      role: "img",
      "aria-label": `Score: ${score}%`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx,
            cy,
            r: radius,
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 10,
            className: "text-muted"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx,
            cy,
            r: radius,
            fill: "none",
            stroke: "url(#scoreGrad)",
            strokeWidth: 10,
            strokeLinecap: "round",
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            className: "score-ring"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "scoreGrad", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#7c3aed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#a855f7" })
        ] }) })
      ]
    }
  );
}
const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
function WeeklyTickSystem() {
  const today = /* @__PURE__ */ new Date();
  const isoWeek = getISOWeek(today);
  const isoYear = getYear(today);
  const weekKey = `${isoYear}-W${isoWeek}`;
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: endOfWeek(today, { weekStartsOn: 1 })
  });
  const [ticks, setTicks] = reactExports.useState(
    () => loadWeekTicks(weekKey)
  );
  const todayStr = format(today, "yyyy-MM-dd");
  const toggle = (dateStr) => {
    const dayDate = /* @__PURE__ */ new Date(`${dateStr}T00:00:00`);
    if (dayDate > today) return;
    setTicks((prev) => {
      const next = { ...prev, [dateStr]: !prev[dateStr] };
      saveWeekTicks(weekKey, next);
      return next;
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1.5 sm:gap-2", children: weekDays.map((day) => {
    const dateStr = format(day, "yyyy-MM-dd");
    const isFuture = day > today && dateStr !== todayStr;
    const isToday = dateStr === todayStr;
    const checked = !!ticks[dateStr];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => toggle(dateStr),
        disabled: isFuture,
        className: `flex flex-col items-center gap-1 rounded-xl p-2 sm:p-3 transition-all border ${isFuture ? "border-border/20 bg-muted/20 cursor-not-allowed opacity-40" : checked ? "border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_12px_rgba(52,211,153,0.3)]" : isToday ? "border-violet-500/50 bg-violet-500/10 animate-pulse" : "border-border/30 bg-muted/20 hover:bg-muted/40"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground", children: DAY_NAMES[weekDays.indexOf(day)] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-6 flex items-center justify-center", children: isFuture ? /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3.5 w-3.5 text-muted-foreground/50" }) : checked ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "✅" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `h-5 w-5 rounded-full border-2 ${isToday ? "border-violet-400" : "border-border/50"}`
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: format(day, "d") })
        ]
      },
      dateStr
    );
  }) });
}
const PIE_COLORS = [
  "#7c3aed",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#8b5cf6"
];
function CategoryPieChart({
  data
}) {
  if (data.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Pie,
      {
        data,
        cx: "50%",
        cy: "50%",
        innerRadius: 50,
        outerRadius: 80,
        dataKey: "value",
        paddingAngle: 2,
        children: data.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Cell,
          {
            fill: PIE_COLORS[i % PIE_COLORS.length]
          },
          `cell-${entry.name}`
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tooltip,
      {
        contentStyle: {
          backgroundColor: "oklch(0.12 0.025 280)",
          border: "1px solid oklch(0.22 0.025 280)",
          borderRadius: "8px",
          color: "oklch(0.97 0.002 270)",
          fontSize: "12px"
        }
      }
    )
  ] }) });
}
function WeeklyBarChart({ weekTasks }) {
  const today = /* @__PURE__ */ new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const days = eachDayOfInterval({
    start: weekStart,
    end: endOfWeek(today, { weekStartsOn: 1 })
  });
  const data = days.map((day) => {
    const dateStr = format(day, "yyyy-MM-dd");
    const dayTasks = weekTasks.filter((t) => t.date === dateStr);
    return {
      day: format(day, "EEE"),
      completed: dayTasks.filter((t) => t.completed).length,
      total: dayTasks.length
    };
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 180, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data, barGap: 2, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      XAxis,
      {
        dataKey: "day",
        tick: { fill: "oklch(0.52 0.01 270)", fontSize: 11 },
        axisLine: false,
        tickLine: false
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { hide: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Tooltip,
      {
        contentStyle: {
          backgroundColor: "oklch(0.12 0.025 280)",
          border: "1px solid oklch(0.22 0.025 280)",
          borderRadius: "8px",
          color: "oklch(0.97 0.002 270)",
          fontSize: "12px"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Bar,
      {
        dataKey: "total",
        fill: "oklch(0.22 0.025 280)",
        radius: [4, 4, 0, 0]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "completed", fill: "#7c3aed", radius: [4, 4, 0, 0] })
  ] }) });
}
function GoalCard({
  goals,
  onGoalChange,
  todayCompleted,
  weeklyCompleted
}) {
  const dailyPct = goals.daily > 0 ? Math.min(100, Math.round(todayCompleted / goals.daily * 100)) : 0;
  const weeklyPct = goals.weekly > 0 ? Math.min(100, Math.round(weeklyCompleted / goals.weekly * 100)) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-4 w-4 text-violet-400" }),
      "Goals"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Daily" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onGoalChange({
                  ...goals,
                  daily: Math.max(1, goals.daily - 1)
                }),
                className: "h-5 w-5 rounded flex items-center justify-center bg-muted hover:bg-muted/70 text-muted-foreground",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3 w-3" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold w-6 text-center", children: goals.daily }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onGoalChange({ ...goals, daily: goals.daily + 1 }),
                className: "h-5 w-5 rounded flex items-center justify-center bg-muted hover:bg-muted/70 text-muted-foreground",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full rounded-full bg-violet-500 transition-all",
            style: { width: `${dailyPct}%` }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          todayCompleted,
          "/",
          goals.daily,
          " today (",
          dailyPct,
          "%)"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Weekly" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onGoalChange({
                  ...goals,
                  weekly: Math.max(1, goals.weekly - 5)
                }),
                className: "h-5 w-5 rounded flex items-center justify-center bg-muted hover:bg-muted/70 text-muted-foreground",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3 w-3" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold w-8 text-center", children: goals.weekly }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onGoalChange({ ...goals, weekly: goals.weekly + 5 }),
                className: "h-5 w-5 rounded flex items-center justify-center bg-muted hover:bg-muted/70 text-muted-foreground",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full rounded-full bg-fuchsia-500 transition-all",
            style: { width: `${weeklyPct}%` }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          weeklyCompleted,
          "/",
          goals.weekly,
          " this week (",
          weeklyPct,
          "%)"
        ] })
      ] })
    ] })
  ] });
}
function Dashboard() {
  const [taskDialogOpen, setTaskDialogOpen] = reactExports.useState(false);
  const [editingTask, setEditingTask] = reactExports.useState(null);
  const [suggestionsOpen, setSuggestionsOpen] = reactExports.useState(false);
  const [routineMode, setRoutineMode] = reactExports.useState(false);
  const [goals, setGoals] = reactExports.useState(() => loadGoals());
  const reminderShownRef = reactExports.useRef(false);
  const todayDate = getTodayDateString();
  const weekStart = format(
    startOfWeek(/* @__PURE__ */ new Date(), { weekStartsOn: 1 }),
    "yyyy-MM-dd"
  );
  const weekEnd = format(
    endOfWeek(/* @__PURE__ */ new Date(), { weekStartsOn: 1 }),
    "yyyy-MM-dd"
  );
  const lastWeekStart = format(
    startOfWeek(new Date(Date.now() - 7 * 24 * 60 * 60 * 1e3), {
      weekStartsOn: 1
    }),
    "yyyy-MM-dd"
  );
  const lastWeekEnd = format(
    endOfWeek(new Date(Date.now() - 7 * 24 * 60 * 60 * 1e3), {
      weekStartsOn: 1
    }),
    "yyyy-MM-dd"
  );
  const { data: todayTasks = [], isLoading: isLoadingToday } = useTasksForDate(todayDate);
  const { data: weekTasks = [] } = useTasksForDateRange(weekStart, weekEnd);
  const { data: lastWeekTasks = [] } = useTasksForDateRange(
    lastWeekStart,
    lastWeekEnd
  );
  const {
    data: suggestions = [],
    isLoading: suggestionsLoading,
    refetch: refetchSuggestions
  } = useTaskSuggestions();
  const { actor, isFetching } = useActor();
  const createTaskMutation = useCreateTask();
  const { data: isPremium } = useQuery({
    queryKey: ["isCallerPremium"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerPremium();
    },
    enabled: !!actor && !isFetching
  });
  const FREE_TASK_LIMIT = 10;
  const isAtTaskLimit = !isPremium && todayTasks.length >= FREE_TASK_LIMIT;
  const dailySummary = calculateDailySummary(todayTasks, todayDate);
  const categoryScores = calculateCategoryScores(todayTasks, todayDate);
  const streakInfo = calculateStreaks(weekTasks);
  const weeklySummary = calculateWeeklySummary(weekTasks);
  const totalCompletedTasks = weekTasks.filter((t) => t.completed).length;
  const thisWeekCompleted = weekTasks.filter((t) => t.completed).length;
  const lastWeekCompleted = lastWeekTasks.filter((t) => t.completed).length;
  const weekImprovement = lastWeekCompleted > 0 ? Math.round(
    (thisWeekCompleted - lastWeekCompleted) / lastWeekCompleted * 100
  ) : thisWeekCompleted > 0 ? 100 : 0;
  const handleGoalChange = (g) => {
    setGoals(g);
    saveGoals(g);
  };
  reactExports.useEffect(() => {
    if (reminderShownRef.current) return;
    const hour = (/* @__PURE__ */ new Date()).getHours();
    if (hour >= 12 && todayTasks.length === 0) {
      const lastShown = localStorage.getItem(LS_REMINDER);
      const today = getTodayDateString();
      if (lastShown === today) return;
      localStorage.setItem(LS_REMINDER, today);
      reminderShownRef.current = true;
      if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission().then((perm) => {
          if (perm === "granted") {
            new Notification("Don't break your streak 🔥", {
              body: "Add your tasks for today and keep the chain going!",
              icon: "/assets/uploads/image-1.png"
            });
          }
        });
      } else if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Don't break your streak 🔥", {
          body: "Add your tasks for today and keep the chain going!",
          icon: "/assets/uploads/image-1.png"
        });
      } else {
        setTimeout(() => {
          ue("Don't break your streak 🔥", {
            description: "Add your tasks for today and keep the chain going!"
          });
        }, 2e3);
      }
    }
  }, [todayTasks.length]);
  const handleEditTask = (task) => {
    setEditingTask(task);
    setTaskDialogOpen(true);
  };
  const handleNewTask = () => {
    if (isAtTaskLimit) {
      ue.error("Free plan limit reached (10/day). Upgrade to Premium.");
      return;
    }
    setEditingTask(null);
    setTaskDialogOpen(true);
  };
  const handleAddSuggestion = (suggestion) => {
    createTaskMutation.mutate(
      {
        name: suggestion.name,
        category: suggestion.category,
        priority: suggestion.priority,
        estimatedDuration: suggestion.estimatedDuration,
        date: todayDate
      },
      {
        onSuccess: () => ue.success(`Added: ${suggestion.name}`),
        onError: () => ue.error("Failed to add task")
      }
    );
  };
  const getPriorityColor = (priority) => {
    switch (priority) {
      case Priority.high:
        return "bg-destructive/10 text-destructive border-destructive/20";
      case Priority.medium:
        return "bg-accent/10 text-accent-foreground border-accent/20";
      case Priority.low:
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };
  const getCategoryColor = (category) => {
    const colors = {
      study: "bg-chart-1/20 text-chart-1 border-chart-1/30",
      fitness: "bg-chart-2/20 text-chart-2 border-chart-2/30",
      health: "bg-chart-3/20 text-chart-3 border-chart-3/30",
      work: "bg-chart-4/20 text-chart-4 border-chart-4/30",
      personalDevelopment: "bg-chart-5/20 text-chart-5 border-chart-5/30",
      social: "bg-chart-6/20 text-chart-6 border-chart-6/30",
      other: "bg-chart-7/20 text-chart-7 border-chart-7/30"
    };
    return colors[category] || colors.other;
  };
  const categoryPieData = categoryScores.filter((cs) => cs.totalTasks > 0).map((cs) => ({
    name: CATEGORY_LABELS[cs.category],
    value: cs.totalTasks
  }));
  if (isLoadingToday) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingScreen, { message: "Loading your tasks..." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl sm:text-3xl font-bold tracking-tight", children: "Today's Routine" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-2 text-muted-foreground text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
          format(/* @__PURE__ */ new Date(), "EEEE, MMMM d, yyyy")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        isAtTaskLimit && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/premium", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "text-xs text-amber-500 flex items-center gap-1 cursor-pointer",
            "data-ocid": "dashboard.primary_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-3 w-3" }),
              todayTasks.length,
              "/10 — Upgrade"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => setRoutineMode((v) => !v),
            variant: routineMode ? "default" : "outline",
            size: "sm",
            className: `gap-1.5 ${routineMode ? "bg-violet-600 hover:bg-violet-500 text-white border-0" : "border-violet-500/30 text-violet-400 hover:bg-violet-500/10"}`,
            "data-ocid": "dashboard.toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4" }),
              routineMode ? "Exit Routine Mode" : "Routine Mode"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleNewTask,
            size: "sm",
            className: "gap-1.5 bg-violet-600 hover:bg-violet-500 text-white border-0",
            disabled: isAtTaskLimit,
            "data-ocid": "dashboard.secondary_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              "Add Task"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: routineMode ? (
      /* ── ROUTINE / ADVANCED MODE ── */
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          transition: { duration: 0.3 },
          className: "space-y-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 border-violet-500/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Daily Score" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Your performance today" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "flex flex-col items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreCircle, { score: dailySummary.score, size: 200 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-4xl font-extrabold text-violet-400", children: [
                      dailySummary.score,
                      "%"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground mt-1", children: [
                      dailySummary.completedTasks,
                      "/",
                      dailySummary.totalTasks,
                      " ",
                      "tasks"
                    ] })
                  ] })
                ] }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StreakDisplay, { streakInfo }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(RankCard, { totalCompletedTasks })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryRadarChart, { categoryScores }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Category Breakdown" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Task distribution by category" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: categoryPieData.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryPieChart, { data: categoryPieData }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mt-2 justify-center", children: categoryPieData.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "flex items-center gap-1 text-xs text-muted-foreground",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "inline-block h-2 w-2 rounded-full",
                            style: {
                              background: PIE_COLORS[i % PIE_COLORS.length]
                            }
                          }
                        ),
                        d.name
                      ]
                    },
                    d.name
                  )) })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-8", children: "Add tasks to see breakdown" }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-violet-400" }),
                  "Weekly Progress"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Completed vs total tasks per day" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(WeeklyBarChart, { weekTasks }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
              {
                label: "Today",
                value: `${dailySummary.completedTasks}/${dailySummary.totalTasks}`,
                color: "text-violet-400"
              },
              {
                label: "This Week",
                value: `${thisWeekCompleted}`,
                color: "text-fuchsia-400"
              },
              {
                label: "Best Day",
                value: weeklySummary.bestDay ? `${weeklySummary.bestDay.score}%` : "—",
                color: "text-emerald-400"
              },
              {
                label: "Avg Score",
                value: `${Math.round(weeklySummary.averageScore)}%`,
                color: "text-blue-400"
              }
            ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-3 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-2xl font-bold ${stat.color}`, children: stat.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: stat.label })
            ] }) }, stat.label)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-violet-500/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Dumbbell, { className: "h-4 w-4 text-violet-400" }),
                  "Weekly Accountability"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Tick each day you completed your tasks. Future days are locked." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(WeeklyTickSystem, {}) })
            ] })
          ]
        },
        "routine"
      )
    ) : (
      /* ── NORMAL MODE ── */
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          transition: { duration: 0.3 },
          className: "space-y-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(WeeklyTaskCalendar, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 border-violet-500/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Daily Score" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Your productivity today" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreCircle, { score: dailySummary.score, size: 100 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl font-extrabold text-violet-400", children: [
                      dailySummary.score,
                      "%"
                    ] }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                      dailySummary.completedTasks,
                      "/",
                      dailySummary.totalTasks,
                      " ",
                      "tasks"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                      "Daily goal: ",
                      goals.daily
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-24 rounded-full bg-muted mt-1 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-full rounded-full bg-violet-500 transition-all",
                        style: {
                          width: `${Math.min(100, Math.round(dailySummary.completedTasks / goals.daily * 100))}%`
                        }
                      }
                    ) })
                  ] })
                ] }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StreakDisplay, { streakInfo }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(RankCard, { totalCompletedTasks })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Tasks" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: todayTasks.length === 0 ? "No tasks yet — let's get started!" : `${todayTasks.length} ${todayTasks.length === 1 ? "task" : "tasks"} for today` })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: todayTasks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-violet-500/20 bg-violet-500/5 py-14 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-3", children: "💪" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground", children: "Start building your grind" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Every journey begins with a single task" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      onClick: handleNewTask,
                      className: "mt-5 bg-violet-600 hover:bg-violet-500 text-white border-0 animate-pulse h-10 px-6",
                      size: "default",
                      "data-ocid": "dashboard.empty_state",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
                        "Add Your First Task"
                      ]
                    }
                  )
                ] }) : todayTasks.map((task) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TaskItem,
                  {
                    task,
                    onEdit: handleEditTask
                  },
                  task.id
                )) })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryRadarChart, { categoryScores }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  GoalCard,
                  {
                    goals,
                    onGoalChange: handleGoalChange,
                    todayCompleted: dailySummary.completedTasks,
                    weeklyCompleted: thisWeekCompleted
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-violet-500/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-violet-400" }),
                    "This Week"
                  ] }),
                  weekImprovement !== 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `text-sm font-semibold ${weekImprovement > 0 ? "text-emerald-400" : "text-red-400"}`,
                      children: [
                        weekImprovement > 0 ? "↑" : "↓",
                        " ",
                        Math.abs(weekImprovement),
                        "% vs last week"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { children: [
                  thisWeekCompleted,
                  " tasks completed this week",
                  lastWeekCompleted > 0 && weekImprovement > 0 ? ` — you're ${weekImprovement}% more productive than last week!` : ""
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(WeeklyBarChart, { weekTasks }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Collapsible,
              {
                open: suggestionsOpen,
                onOpenChange: setSuggestionsOpen,
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-primary" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Suggestions" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            variant: "ghost",
                            size: "sm",
                            onClick: () => refetchSuggestions(),
                            disabled: suggestionsLoading,
                            className: "gap-2",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                RefreshCw,
                                {
                                  className: `h-4 w-4 ${suggestionsLoading ? "animate-spin" : ""}`
                                }
                              ),
                              "Refresh"
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", children: suggestionsOpen ? "Hide" : "Show" }) })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Suggestions to get you started with" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: suggestionsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary/20 border-t-primary" }) }) : suggestions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-sm text-muted-foreground", children: "No suggestions available right now. Try refreshing later!" }) : suggestions.slice(0, 5).map((suggestion) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "group relative overflow-hidden rounded-lg border bg-card p-4 transition-all hover:shadow-md hover:border-primary/30",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold", children: suggestion.name }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Badge,
                              {
                                variant: "outline",
                                className: getCategoryColor(
                                  suggestion.category
                                ),
                                children: CATEGORY_LABELS[suggestion.category]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Badge,
                              {
                                variant: "outline",
                                className: getPriorityColor(
                                  suggestion.priority
                                ),
                                children: suggestion.priority.toUpperCase()
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: suggestion.reason })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            size: "sm",
                            onClick: () => handleAddSuggestion(suggestion),
                            disabled: createTaskMutation.isPending,
                            className: "shrink-0",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
                              "Add"
                            ]
                          }
                        )
                      ] })
                    },
                    suggestion.name
                  )) }) })
                ] })
              }
            )
          ]
        },
        "normal"
      )
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TaskFormDialog,
      {
        open: taskDialogOpen,
        onOpenChange: setTaskDialogOpen,
        date: todayDate,
        task: editingTask
      }
    )
  ] });
}
export {
  Dashboard
};
