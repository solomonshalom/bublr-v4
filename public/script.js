/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

(() => {
  var u = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
  var Gi = u(() => {
    window.tram = (function (e) {
      function t(l, y) {
        var S = new g.Bare();
        return S.init(l, y);
      }
      function r(l) {
        return l.replace(/[A-Z]/g, function (y) {
          return "-" + y.toLowerCase();
        });
      }
      function n(l) {
        var y = parseInt(l.slice(1), 16),
          S = (y >> 16) & 255,
          w = (y >> 8) & 255,
          O = 255 & y;
        return [S, w, O];
      }
      function a(l, y, S) {
        return (
          "#" + ((1 << 24) | (l << 16) | (y << 8) | S).toString(16).slice(1)
        );
      }
      function i() {}
      function o(l, y) {
        d("Type warning: Expected: [" + l + "] Got: [" + typeof y + "] " + y);
      }
      function s(l, y, S) {
        d("Units do not match [" + l + "]: " + y + ", " + S);
      }
      function c(l, y, S) {
        if ((y !== void 0 && (S = y), l === void 0)) return S;
        var w = S;
        return (
          Et.test(l) || !kt.test(l)
            ? (w = parseInt(l, 10))
            : kt.test(l) && (w = 1e3 * parseFloat(l)),
          0 > w && (w = 0),
          w === w ? w : S
        );
      }
      function d(l) {
        ce.debug && window && window.console.warn(l);
      }
      function v(l) {
        for (var y = -1, S = l ? l.length : 0, w = []; ++y < S; ) {
          var O = l[y];
          O && w.push(O);
        }
        return w;
      }
      var p = (function (l, y, S) {
          function w(ee) {
            return typeof ee == "object";
          }
          function O(ee) {
            return typeof ee == "function";
          }
          function R() {}
          function K(ee, pe) {
            function W() {
              var xe = new ae();
              return O(xe.init) && xe.init.apply(xe, arguments), xe;
            }
            function ae() {}
            pe === S && ((pe = ee), (ee = Object)), (W.Bare = ae);
            var oe,
              Ie = (R[l] = ee[l]),
              at = (ae[l] = W[l] = new R());
            return (
              (at.constructor = W),
              (W.mixin = function (xe) {
                return (ae[l] = W[l] = K(W, xe)[l]), W;
              }),
              (W.open = function (xe) {
                if (
                  ((oe = {}),
                  O(xe) ? (oe = xe.call(W, at, Ie, W, ee)) : w(xe) && (oe = xe),
                  w(oe))
                )
                  for (var br in oe) y.call(oe, br) && (at[br] = oe[br]);
                return O(at.init) || (at.init = ee), W;
              }),
              W.open(pe)
            );
          }
          return K;
        })("prototype", {}.hasOwnProperty),
        h = {
          ease: [
            "ease",
            function (l, y, S, w) {
              var O = (l /= w) * l,
                R = O * l;
              return (
                y +
                S * (-2.75 * R * O + 11 * O * O + -15.5 * R + 8 * O + 0.25 * l)
              );
            },
          ],
          "ease-in": [
            "ease-in",
            function (l, y, S, w) {
              var O = (l /= w) * l,
                R = O * l;
              return y + S * (-1 * R * O + 3 * O * O + -3 * R + 2 * O);
            },
          ],
          "ease-out": [
            "ease-out",
            function (l, y, S, w) {
              var O = (l /= w) * l,
                R = O * l;
              return (
                y +
                S * (0.3 * R * O + -1.6 * O * O + 2.2 * R + -1.8 * O + 1.9 * l)
              );
            },
          ],
          "ease-in-out": [
            "ease-in-out",
            function (l, y, S, w) {
              var O = (l /= w) * l,
                R = O * l;
              return y + S * (2 * R * O + -5 * O * O + 2 * R + 2 * O);
            },
          ],
          linear: [
            "linear",
            function (l, y, S, w) {
              return (S * l) / w + y;
            },
          ],
          "ease-in-quad": [
            "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
            function (l, y, S, w) {
              return S * (l /= w) * l + y;
            },
          ],
          "ease-out-quad": [
            "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
            function (l, y, S, w) {
              return -S * (l /= w) * (l - 2) + y;
            },
          ],
          "ease-in-out-quad": [
            "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
            function (l, y, S, w) {
              return (l /= w / 2) < 1
                ? (S / 2) * l * l + y
                : (-S / 2) * (--l * (l - 2) - 1) + y;
            },
          ],
          "ease-in-cubic": [
            "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
            function (l, y, S, w) {
              return S * (l /= w) * l * l + y;
            },
          ],
          "ease-out-cubic": [
            "cubic-bezier(0.215, 0.610, 0.355, 1)",
            function (l, y, S, w) {
              return S * ((l = l / w - 1) * l * l + 1) + y;
            },
          ],
          "ease-in-out-cubic": [
            "cubic-bezier(0.645, 0.045, 0.355, 1)",
            function (l, y, S, w) {
              return (l /= w / 2) < 1
                ? (S / 2) * l * l * l + y
                : (S / 2) * ((l -= 2) * l * l + 2) + y;
            },
          ],
          "ease-in-quart": [
            "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
            function (l, y, S, w) {
              return S * (l /= w) * l * l * l + y;
            },
          ],
          "ease-out-quart": [
            "cubic-bezier(0.165, 0.840, 0.440, 1)",
            function (l, y, S, w) {
              return -S * ((l = l / w - 1) * l * l * l - 1) + y;
            },
          ],
          "ease-in-out-quart": [
            "cubic-bezier(0.770, 0, 0.175, 1)",
            function (l, y, S, w) {
              return (l /= w / 2) < 1
                ? (S / 2) * l * l * l * l + y
                : (-S / 2) * ((l -= 2) * l * l * l - 2) + y;
            },
          ],
          "ease-in-quint": [
            "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
            function (l, y, S, w) {
              return S * (l /= w) * l * l * l * l + y;
            },
          ],
          "ease-out-quint": [
            "cubic-bezier(0.230, 1, 0.320, 1)",
            function (l, y, S, w) {
              return S * ((l = l / w - 1) * l * l * l * l + 1) + y;
            },
          ],
          "ease-in-out-quint": [
            "cubic-bezier(0.860, 0, 0.070, 1)",
            function (l, y, S, w) {
              return (l /= w / 2) < 1
                ? (S / 2) * l * l * l * l * l + y
                : (S / 2) * ((l -= 2) * l * l * l * l + 2) + y;
            },
          ],
          "ease-in-sine": [
            "cubic-bezier(0.470, 0, 0.745, 0.715)",
            function (l, y, S, w) {
              return -S * Math.cos((l / w) * (Math.PI / 2)) + S + y;
            },
          ],
          "ease-out-sine": [
            "cubic-bezier(0.390, 0.575, 0.565, 1)",
            function (l, y, S, w) {
              return S * Math.sin((l / w) * (Math.PI / 2)) + y;
            },
          ],
          "ease-in-out-sine": [
            "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
            function (l, y, S, w) {
              return (-S / 2) * (Math.cos((Math.PI * l) / w) - 1) + y;
            },
          ],
          "ease-in-expo": [
            "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
            function (l, y, S, w) {
              return l === 0 ? y : S * Math.pow(2, 10 * (l / w - 1)) + y;
            },
          ],
          "ease-out-expo": [
            "cubic-bezier(0.190, 1, 0.220, 1)",
            function (l, y, S, w) {
              return l === w
                ? y + S
                : S * (-Math.pow(2, (-10 * l) / w) + 1) + y;
            },
          ],
          "ease-in-out-expo": [
            "cubic-bezier(1, 0, 0, 1)",
            function (l, y, S, w) {
              return l === 0
                ? y
                : l === w
                ? y + S
                : (l /= w / 2) < 1
                ? (S / 2) * Math.pow(2, 10 * (l - 1)) + y
                : (S / 2) * (-Math.pow(2, -10 * --l) + 2) + y;
            },
          ],
          "ease-in-circ": [
            "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
            function (l, y, S, w) {
              return -S * (Math.sqrt(1 - (l /= w) * l) - 1) + y;
            },
          ],
          "ease-out-circ": [
            "cubic-bezier(0.075, 0.820, 0.165, 1)",
            function (l, y, S, w) {
              return S * Math.sqrt(1 - (l = l / w - 1) * l) + y;
            },
          ],
          "ease-in-out-circ": [
            "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
            function (l, y, S, w) {
              return (l /= w / 2) < 1
                ? (-S / 2) * (Math.sqrt(1 - l * l) - 1) + y
                : (S / 2) * (Math.sqrt(1 - (l -= 2) * l) + 1) + y;
            },
          ],
          "ease-in-back": [
            "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
            function (l, y, S, w, O) {
              return (
                O === void 0 && (O = 1.70158),
                S * (l /= w) * l * ((O + 1) * l - O) + y
              );
            },
          ],
          "ease-out-back": [
            "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
            function (l, y, S, w, O) {
              return (
                O === void 0 && (O = 1.70158),
                S * ((l = l / w - 1) * l * ((O + 1) * l + O) + 1) + y
              );
            },
          ],
          "ease-in-out-back": [
            "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
            function (l, y, S, w, O) {
              return (
                O === void 0 && (O = 1.70158),
                (l /= w / 2) < 1
                  ? (S / 2) * l * l * (((O *= 1.525) + 1) * l - O) + y
                  : (S / 2) *
                      ((l -= 2) * l * (((O *= 1.525) + 1) * l + O) + 2) +
                    y
              );
            },
          ],
        },
        I = {
          "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
          "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
          "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)",
        },
        m = document,
        T = window,
        L = "bkwld-tram",
        C = /[\-\.0-9]/g,
        N = /[A-Z]/,
        A = "number",
        M = /^(rgb|#)/,
        q = /(em|cm|mm|in|pt|pc|px)$/,
        x = /(em|cm|mm|in|pt|pc|px|%)$/,
        U = /(deg|rad|turn)$/,
        H = "unitless",
        k = /(all|none) 0s ease 0s/,
        re = /^(width|height)$/,
        Z = " ",
        X = m.createElement("a"),
        b = ["Webkit", "Moz", "O", "ms"],
        D = ["-webkit-", "-moz-", "-o-", "-ms-"],
        G = function (l) {
          if (l in X.style) return { dom: l, css: l };
          var y,
            S,
            w = "",
            O = l.split("-");
          for (y = 0; y < O.length; y++)
            w += O[y].charAt(0).toUpperCase() + O[y].slice(1);
          for (y = 0; y < b.length; y++)
            if (((S = b[y] + w), S in X.style))
              return { dom: S, css: D[y] + l };
        },
        V = (t.support = {
          bind: Function.prototype.bind,
          transform: G("transform"),
          transition: G("transition"),
          backface: G("backface-visibility"),
          timing: G("transition-timing-function"),
        });
      if (V.transition) {
        var $ = V.timing.dom;
        if (((X.style[$] = h["ease-in-back"][0]), !X.style[$]))
          for (var J in I) h[J][0] = I[J];
      }
      var F = (t.frame = (function () {
          var l =
            T.requestAnimationFrame ||
            T.webkitRequestAnimationFrame ||
            T.mozRequestAnimationFrame ||
            T.oRequestAnimationFrame ||
            T.msRequestAnimationFrame;
          return l && V.bind
            ? l.bind(T)
            : function (y) {
                T.setTimeout(y, 16);
              };
        })()),
        j = (t.now = (function () {
          var l = T.performance,
            y = l && (l.now || l.webkitNow || l.msNow || l.mozNow);
          return y && V.bind
            ? y.bind(l)
            : Date.now ||
                function () {
                  return +new Date();
                };
        })()),
        f = p(function (l) {
          function y(Q, se) {
            var ge = v(("" + Q).split(Z)),
              le = ge[0];
            se = se || {};
            var Le = it[le];
            if (!Le) return d("Unsupported property: " + le);
            if (!se.weak || !this.props[le]) {
              var Ke = Le[0],
                Ge = this.props[le];
              return (
                Ge || (Ge = this.props[le] = new Ke.Bare()),
                Ge.init(this.$el, ge, Le, se),
                Ge
              );
            }
          }
          function S(Q, se, ge) {
            if (Q) {
              var le = typeof Q;
              if (
                (se ||
                  (this.timer && this.timer.destroy(),
                  (this.queue = []),
                  (this.active = !1)),
                le == "number" && se)
              )
                return (
                  (this.timer = new ue({
                    duration: Q,
                    context: this,
                    complete: R,
                  })),
                  void (this.active = !0)
                );
              if (le == "string" && se) {
                switch (Q) {
                  case "hide":
                    W.call(this);
                    break;
                  case "stop":
                    K.call(this);
                    break;
                  case "redraw":
                    ae.call(this);
                    break;
                  default:
                    y.call(this, Q, ge && ge[1]);
                }
                return R.call(this);
              }
              if (le == "function") return void Q.call(this, this);
              if (le == "object") {
                var Le = 0;
                at.call(
                  this,
                  Q,
                  function (me, _I) {
                    me.span > Le && (Le = me.span), me.stop(), me.animate(_I);
                  },
                  function (me) {
                    "wait" in me && (Le = c(me.wait, 0));
                  }
                ),
                  Ie.call(this),
                  Le > 0 &&
                    ((this.timer = new ue({ duration: Le, context: this })),
                    (this.active = !0),
                    se && (this.timer.complete = R));
                var Ke = this,
                  Ge = !1,
                  sn = {};
                F(function () {
                  at.call(Ke, Q, function (me) {
                    me.active && ((Ge = !0), (sn[me.name] = me.nextStyle));
                  }),
                    Ge && Ke.$el.css(sn);
                });
              }
            }
          }
          function w(Q) {
            (Q = c(Q, 0)),
              this.active
                ? this.queue.push({ options: Q })
                : ((this.timer = new ue({
                    duration: Q,
                    context: this,
                    complete: R,
                  })),
                  (this.active = !0));
          }
          function O(Q) {
            return this.active
              ? (this.queue.push({ options: Q, args: arguments }),
                void (this.timer.complete = R))
              : d(
                  "No active transition timer. Use start() or wait() before then()."
                );
          }
          function R() {
            if (
              (this.timer && this.timer.destroy(),
              (this.active = !1),
              this.queue.length)
            ) {
              var Q = this.queue.shift();
              S.call(this, Q.options, !0, Q.args);
            }
          }
          function K(Q) {
            this.timer && this.timer.destroy(),
              (this.queue = []),
              (this.active = !1);
            var se;
            typeof Q == "string"
              ? ((se = {}), (se[Q] = 1))
              : (se = typeof Q == "object" && Q != null ? Q : this.props),
              at.call(this, se, xe),
              Ie.call(this);
          }
          function ee(Q) {
            K.call(this, Q), at.call(this, Q, br, EI);
          }
          function pe(Q) {
            typeof Q != "string" && (Q = "block"), (this.el.style.display = Q);
          }
          function W() {
            K.call(this), (this.el.style.display = "none");
          }
          function ae() {
            this.el.offsetHeight;
          }
          function oe() {
            K.call(this), e.removeData(this.el, L), (this.$el = this.el = null);
          }
          function Ie() {
            var Q,
              se,
              ge = [];
            this.upstream && ge.push(this.upstream);
            for (Q in this.props)
              (se = this.props[Q]), se.active && ge.push(se.string);
            (ge = ge.join(",")),
              this.style !== ge &&
                ((this.style = ge), (this.el.style[V.transition.dom] = ge));
          }
          function at(Q, se, ge) {
            var le,
              Le,
              Ke,
              Ge,
              sn = se !== xe,
              me = {};
            for (le in Q)
              (Ke = Q[le]),
                le in qe
                  ? (me.transform || (me.transform = {}),
                    (me.transform[le] = Ke))
                  : (N.test(le) && (le = r(le)),
                    le in it
                      ? (me[le] = Ke)
                      : (Ge || (Ge = {}), (Ge[le] = Ke)));
            for (le in me) {
              if (((Ke = me[le]), (Le = this.props[le]), !Le)) {
                if (!sn) continue;
                Le = y.call(this, le);
              }
              se.call(this, Le, Ke);
            }
            ge && Ge && ge.call(this, Ge);
          }
          function xe(Q) {
            Q.stop();
          }
          function br(Q, se) {
            Q.set(se);
          }
          function EI(Q) {
            this.$el.css(Q);
          }
          function ke(Q, se) {
            l[Q] = function () {
              return this.children
                ? gI.call(this, se, arguments)
                : (this.el && se.apply(this, arguments), this);
            };
          }
          function gI(Q, se) {
            var ge,
              le = this.children.length;
            for (ge = 0; le > ge; ge++) Q.apply(this.children[ge], se);
            return this;
          }
          (l.init = function (Q) {
            if (
              ((this.$el = e(Q)),
              (this.el = this.$el[0]),
              (this.props = {}),
              (this.queue = []),
              (this.style = ""),
              (this.active = !1),
              ce.keepInherited && !ce.fallback)
            ) {
              var se = We(this.el, "transition");
              se && !k.test(se) && (this.upstream = se);
            }
            V.backface &&
              ce.hideBackface &&
              he(this.el, V.backface.css, "hidden");
          }),
            ke("add", y),
            ke("start", S),
            ke("wait", w),
            ke("then", O),
            ke("next", R),
            ke("stop", K),
            ke("set", ee),
            ke("show", pe),
            ke("hide", W),
            ke("redraw", ae),
            ke("destroy", oe);
        }),
        g = p(f, function (l) {
          function y(S, w) {
            var O = e.data(S, L) || e.data(S, L, new f.Bare());
            return O.el || O.init(S), w ? O.start(w) : O;
          }
          l.init = function (S, w) {
            var O = e(S);
            if (!O.length) return this;
            if (O.length === 1) return y(O[0], w);
            var R = [];
            return (
              O.each(function (K, ee) {
                R.push(y(ee, w));
              }),
              (this.children = R),
              this
            );
          };
        }),
        _ = p(function (l) {
          function y() {
            var R = this.get();
            this.update("auto");
            var K = this.get();
            return this.update(R), K;
          }
          function S(R, K, ee) {
            return K !== void 0 && (ee = K), R in h ? R : ee;
          }
          function w(R) {
            var K = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(R);
            return (K ? a(K[1], K[2], K[3]) : R).replace(
              /#(\w)(\w)(\w)$/,
              "#$1$1$2$2$3$3"
            );
          }
          var O = { duration: 500, ease: "ease", delay: 0 };
          (l.init = function (R, K, ee, pe) {
            (this.$el = R), (this.el = R[0]);
            var W = K[0];
            ee[2] && (W = ee[2]),
              Be[W] && (W = Be[W]),
              (this.name = W),
              (this.type = ee[1]),
              (this.duration = c(K[1], this.duration, O.duration)),
              (this.ease = S(K[2], this.ease, O.ease)),
              (this.delay = c(K[3], this.delay, O.delay)),
              (this.span = this.duration + this.delay),
              (this.active = !1),
              (this.nextStyle = null),
              (this.auto = re.test(this.name)),
              (this.unit = pe.unit || this.unit || ce.defaultUnit),
              (this.angle = pe.angle || this.angle || ce.defaultAngle),
              ce.fallback || pe.fallback
                ? (this.animate = this.fallback)
                : ((this.animate = this.transition),
                  (this.string =
                    this.name +
                    Z +
                    this.duration +
                    "ms" +
                    (this.ease != "ease" ? Z + h[this.ease][0] : "") +
                    (this.delay ? Z + this.delay + "ms" : "")));
          }),
            (l.set = function (R) {
              (R = this.convert(R, this.type)), this.update(R), this.redraw();
            }),
            (l.transition = function (R) {
              (this.active = !0),
                (R = this.convert(R, this.type)),
                this.auto &&
                  (this.el.style[this.name] == "auto" &&
                    (this.update(this.get()), this.redraw()),
                  R == "auto" && (R = y.call(this))),
                (this.nextStyle = R);
            }),
            (l.fallback = function (R) {
              var K =
                this.el.style[this.name] || this.convert(this.get(), this.type);
              (R = this.convert(R, this.type)),
                this.auto &&
                  (K == "auto" && (K = this.convert(this.get(), this.type)),
                  R == "auto" && (R = y.call(this))),
                (this.tween = new Y({
                  from: K,
                  to: R,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                  update: this.update,
                  context: this,
                }));
            }),
            (l.get = function () {
              return We(this.el, this.name);
            }),
            (l.update = function (R) {
              he(this.el, this.name, R);
            }),
            (l.stop = function () {
              (this.active || this.nextStyle) &&
                ((this.active = !1),
                (this.nextStyle = null),
                he(this.el, this.name, this.get()));
              var R = this.tween;
              R && R.context && R.destroy();
            }),
            (l.convert = function (R, K) {
              if (R == "auto" && this.auto) return R;
              var ee,
                pe = typeof R == "number",
                W = typeof R == "string";
              switch (K) {
                case A:
                  if (pe) return R;
                  if (W && R.replace(C, "") === "") return +R;
                  ee = "number(unitless)";
                  break;
                case M:
                  if (W) {
                    if (R === "" && this.original) return this.original;
                    if (K.test(R))
                      return R.charAt(0) == "#" && R.length == 7 ? R : w(R);
                  }
                  ee = "hex or rgb string";
                  break;
                case q:
                  if (pe) return R + this.unit;
                  if (W && K.test(R)) return R;
                  ee = "number(px) or string(unit)";
                  break;
                case x:
                  if (pe) return R + this.unit;
                  if (W && K.test(R)) return R;
                  ee = "number(px) or string(unit or %)";
                  break;
                case U:
                  if (pe) return R + this.angle;
                  if (W && K.test(R)) return R;
                  ee = "number(deg) or string(angle)";
                  break;
                case H:
                  if (pe || (W && x.test(R))) return R;
                  ee = "number(unitless) or string(unit or %)";
              }
              return o(ee, R), R;
            }),
            (l.redraw = function () {
              this.el.offsetHeight;
            });
        }),
        E = p(_, function (l, y) {
          l.init = function () {
            y.init.apply(this, arguments),
              this.original || (this.original = this.convert(this.get(), M));
          };
        }),
        B = p(_, function (l, y) {
          (l.init = function () {
            y.init.apply(this, arguments), (this.animate = this.fallback);
          }),
            (l.get = function () {
              return this.$el[this.name]();
            }),
            (l.update = function (S) {
              this.$el[this.name](S);
            });
        }),
        z = p(_, function (l, y) {
          function S(w, O) {
            var R, K, ee, pe, W;
            for (R in w)
              (pe = qe[R]),
                (ee = pe[0]),
                (K = pe[1] || R),
                (W = this.convert(w[R], ee)),
                O.call(this, K, W, ee);
          }
          (l.init = function () {
            y.init.apply(this, arguments),
              this.current ||
                ((this.current = {}),
                qe.perspective &&
                  ce.perspective &&
                  ((this.current.perspective = ce.perspective),
                  he(this.el, this.name, this.style(this.current)),
                  this.redraw()));
          }),
            (l.set = function (w) {
              S.call(this, w, function (O, R) {
                this.current[O] = R;
              }),
                he(this.el, this.name, this.style(this.current)),
                this.redraw();
            }),
            (l.transition = function (w) {
              var O = this.values(w);
              this.tween = new Ae({
                current: this.current,
                values: O,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
              });
              var R,
                K = {};
              for (R in this.current) K[R] = R in O ? O[R] : this.current[R];
              (this.active = !0), (this.nextStyle = this.style(K));
            }),
            (l.fallback = function (w) {
              var O = this.values(w);
              this.tween = new Ae({
                current: this.current,
                values: O,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
                update: this.update,
                context: this,
              });
            }),
            (l.update = function () {
              he(this.el, this.name, this.style(this.current));
            }),
            (l.style = function (w) {
              var O,
                R = "";
              for (O in w) R += O + "(" + w[O] + ") ";
              return R;
            }),
            (l.values = function (w) {
              var O,
                R = {};
              return (
                S.call(this, w, function (K, ee, pe) {
                  (R[K] = ee),
                    this.current[K] === void 0 &&
                      ((O = 0),
                      ~K.indexOf("scale") && (O = 1),
                      (this.current[K] = this.convert(O, pe)));
                }),
                R
              );
            });
        }),
        Y = p(function (l) {
          function y(W) {
            ee.push(W) === 1 && F(S);
          }
          function S() {
            var W,
              ae,
              oe,
              Ie = ee.length;
            if (Ie)
              for (F(S), ae = j(), W = Ie; W--; )
                (oe = ee[W]), oe && oe.render(ae);
          }
          function w(W) {
            var ae,
              oe = e.inArray(W, ee);
            oe >= 0 &&
              ((ae = ee.slice(oe + 1)),
              (ee.length = oe),
              ae.length && (ee = ee.concat(ae)));
          }
          function O(W) {
            return Math.round(W * pe) / pe;
          }
          function R(W, ae, oe) {
            return a(
              W[0] + oe * (ae[0] - W[0]),
              W[1] + oe * (ae[1] - W[1]),
              W[2] + oe * (ae[2] - W[2])
            );
          }
          var K = { ease: h.ease[1], from: 0, to: 1 };
          (l.init = function (W) {
            (this.duration = W.duration || 0), (this.delay = W.delay || 0);
            var ae = W.ease || K.ease;
            h[ae] && (ae = h[ae][1]),
              typeof ae != "function" && (ae = K.ease),
              (this.ease = ae),
              (this.update = W.update || i),
              (this.complete = W.complete || i),
              (this.context = W.context || this),
              (this.name = W.name);
            var oe = W.from,
              Ie = W.to;
            oe === void 0 && (oe = K.from),
              Ie === void 0 && (Ie = K.to),
              (this.unit = W.unit || ""),
              typeof oe == "number" && typeof Ie == "number"
                ? ((this.begin = oe), (this.change = Ie - oe))
                : this.format(Ie, oe),
              (this.value = this.begin + this.unit),
              (this.start = j()),
              W.autoplay !== !1 && this.play();
          }),
            (l.play = function () {
              this.active ||
                (this.start || (this.start = j()), (this.active = !0), y(this));
            }),
            (l.stop = function () {
              this.active && ((this.active = !1), w(this));
            }),
            (l.render = function (W) {
              var ae,
                oe = W - this.start;
              if (this.delay) {
                if (oe <= this.delay) return;
                oe -= this.delay;
              }
              if (oe < this.duration) {
                var Ie = this.ease(oe, 0, 1, this.duration);
                return (
                  (ae = this.startRGB
                    ? R(this.startRGB, this.endRGB, Ie)
                    : O(this.begin + Ie * this.change)),
                  (this.value = ae + this.unit),
                  void this.update.call(this.context, this.value)
                );
              }
              (ae = this.endHex || this.begin + this.change),
                (this.value = ae + this.unit),
                this.update.call(this.context, this.value),
                this.complete.call(this.context),
                this.destroy();
            }),
            (l.format = function (W, ae) {
              if (((ae += ""), (W += ""), W.charAt(0) == "#"))
                return (
                  (this.startRGB = n(ae)),
                  (this.endRGB = n(W)),
                  (this.endHex = W),
                  (this.begin = 0),
                  void (this.change = 1)
                );
              if (!this.unit) {
                var oe = ae.replace(C, ""),
                  Ie = W.replace(C, "");
                oe !== Ie && s("tween", ae, W), (this.unit = oe);
              }
              (ae = parseFloat(ae)),
                (W = parseFloat(W)),
                (this.begin = this.value = ae),
                (this.change = W - ae);
            }),
            (l.destroy = function () {
              this.stop(),
                (this.context = null),
                (this.ease = this.update = this.complete = i);
            });
          var ee = [],
            pe = 1e3;
        }),
        ue = p(Y, function (l) {
          (l.init = function (y) {
            (this.duration = y.duration || 0),
              (this.complete = y.complete || i),
              (this.context = y.context),
              this.play();
          }),
            (l.render = function (y) {
              var S = y - this.start;
              S < this.duration ||
                (this.complete.call(this.context), this.destroy());
            });
        }),
        Ae = p(Y, function (l, y) {
          (l.init = function (S) {
            (this.context = S.context),
              (this.update = S.update),
              (this.tweens = []),
              (this.current = S.current);
            var w, O;
            for (w in S.values)
              (O = S.values[w]),
                this.current[w] !== O &&
                  this.tweens.push(
                    new Y({
                      name: w,
                      from: this.current[w],
                      to: O,
                      duration: S.duration,
                      delay: S.delay,
                      ease: S.ease,
                      autoplay: !1,
                    })
                  );
            this.play();
          }),
            (l.render = function (S) {
              var w,
                O,
                R = this.tweens.length,
                K = !1;
              for (w = R; w--; )
                (O = this.tweens[w]),
                  O.context &&
                    (O.render(S), (this.current[O.name] = O.value), (K = !0));
              return K
                ? void (this.update && this.update.call(this.context))
                : this.destroy();
            }),
            (l.destroy = function () {
              if ((y.destroy.call(this), this.tweens)) {
                var S,
                  w = this.tweens.length;
                for (S = w; S--; ) this.tweens[S].destroy();
                (this.tweens = null), (this.current = null);
              }
            });
        }),
        ce = (t.config = {
          debug: !1,
          defaultUnit: "px",
          defaultAngle: "deg",
          keepInherited: !1,
          hideBackface: !1,
          perspective: "",
          fallback: !V.transition,
          agentTests: [],
        });
      (t.fallback = function (l) {
        if (!V.transition) return (ce.fallback = !0);
        ce.agentTests.push("(" + l + ")");
        var y = new RegExp(ce.agentTests.join("|"), "i");
        ce.fallback = y.test(navigator.userAgent);
      }),
        t.fallback("6.0.[2-5] Safari"),
        (t.tween = function (l) {
          return new Y(l);
        }),
        (t.delay = function (l, y, S) {
          return new ue({ complete: y, duration: l, context: S });
        }),
        (e.fn.tram = function (l) {
          return t.call(null, this, l);
        });
      var he = e.style,
        We = e.css,
        Be = { transform: V.transform && V.transform.css },
        it = {
          color: [E, M],
          background: [E, M, "background-color"],
          "outline-color": [E, M],
          "border-color": [E, M],
          "border-top-color": [E, M],
          "border-right-color": [E, M],
          "border-bottom-color": [E, M],
          "border-left-color": [E, M],
          "border-width": [_, q],
          "border-top-width": [_, q],
          "border-right-width": [_, q],
          "border-bottom-width": [_, q],
          "border-left-width": [_, q],
          "border-spacing": [_, q],
          "letter-spacing": [_, q],
          margin: [_, q],
          "margin-top": [_, q],
          "margin-right": [_, q],
          "margin-bottom": [_, q],
          "margin-left": [_, q],
          padding: [_, q],
          "padding-top": [_, q],
          "padding-right": [_, q],
          "padding-bottom": [_, q],
          "padding-left": [_, q],
          "outline-width": [_, q],
          opacity: [_, A],
          top: [_, x],
          right: [_, x],
          bottom: [_, x],
          left: [_, x],
          "font-size": [_, x],
          "text-indent": [_, x],
          "word-spacing": [_, x],
          width: [_, x],
          "min-width": [_, x],
          "max-width": [_, x],
          height: [_, x],
          "min-height": [_, x],
          "max-height": [_, x],
          "line-height": [_, H],
          "scroll-top": [B, A, "scrollTop"],
          "scroll-left": [B, A, "scrollLeft"],
        },
        qe = {};
      V.transform &&
        ((it.transform = [z]),
        (qe = {
          x: [x, "translateX"],
          y: [x, "translateY"],
          rotate: [U],
          rotateX: [U],
          rotateY: [U],
          scale: [A],
          scaleX: [A],
          scaleY: [A],
          skew: [U],
          skewX: [U],
          skewY: [U],
        })),
        V.transform &&
          V.backface &&
          ((qe.z = [x, "translateZ"]),
          (qe.rotateZ = [U]),
          (qe.scaleZ = [A]),
          (qe.perspective = [q]));
      var Et = /ms/,
        kt = /s|\./;
      return (e.tram = t);
    })(window.jQuery);
  });
  var As = u((DW, Ss) => {
    var yI = window.$,
      II = Gi() && yI.tram;
    Ss.exports = (function () {
      var e = {};
      e.VERSION = "1.6.0-Webflow";
      var t = {},
        r = Array.prototype,
        n = Object.prototype,
        a = Function.prototype,
        i = r.push,
        o = r.slice,
        s = r.concat,
        c = n.toString,
        d = n.hasOwnProperty,
        v = r.forEach,
        p = r.map,
        h = r.reduce,
        I = r.reduceRight,
        m = r.filter,
        T = r.every,
        L = r.some,
        C = r.indexOf,
        N = r.lastIndexOf,
        A = Array.isArray,
        M = Object.keys,
        q = a.bind,
        x =
          (e.each =
          e.forEach =
            function (b, D, G) {
              if (b == null) return b;
              if (v && b.forEach === v) b.forEach(D, G);
              else if (b.length === +b.length) {
                for (var V = 0, $ = b.length; V < $; V++)
                  if (D.call(G, b[V], V, b) === t) return;
              } else
                for (var J = e.keys(b), V = 0, $ = J.length; V < $; V++)
                  if (D.call(G, b[J[V]], J[V], b) === t) return;
              return b;
            });
      (e.map = e.collect =
        function (b, D, G) {
          var V = [];
          return b == null
            ? V
            : p && b.map === p
            ? b.map(D, G)
            : (x(b, function ($, J, F) {
                V.push(D.call(G, $, J, F));
              }),
              V);
        }),
        (e.find = e.detect =
          function (b, D, G) {
            var V;
            return (
              U(b, function ($, J, F) {
                if (D.call(G, $, J, F)) return (V = $), !0;
              }),
              V
            );
          }),
        (e.filter = e.select =
          function (b, D, G) {
            var V = [];
            return b == null
              ? V
              : m && b.filter === m
              ? b.filter(D, G)
              : (x(b, function ($, J, F) {
                  D.call(G, $, J, F) && V.push($);
                }),
                V);
          });
      var U =
        (e.some =
        e.any =
          function (b, D, G) {
            D || (D = e.identity);
            var V = !1;
            return b == null
              ? V
              : L && b.some === L
              ? b.some(D, G)
              : (x(b, function ($, J, F) {
                  if (V || (V = D.call(G, $, J, F))) return t;
                }),
                !!V);
          });
      (e.contains = e.include =
        function (b, D) {
          return b == null
            ? !1
            : C && b.indexOf === C
            ? b.indexOf(D) != -1
            : U(b, function (G) {
                return G === D;
              });
        }),
        (e.delay = function (b, D) {
          var G = o.call(arguments, 2);
          return setTimeout(function () {
            return b.apply(null, G);
          }, D);
        }),
        (e.defer = function (b) {
          return e.delay.apply(e, [b, 1].concat(o.call(arguments, 1)));
        }),
        (e.throttle = function (b) {
          var D, G, V;
          return function () {
            D ||
              ((D = !0),
              (G = arguments),
              (V = this),
              II.frame(function () {
                (D = !1), b.apply(V, G);
              }));
          };
        }),
        (e.debounce = function (b, D, G) {
          var V,
            $,
            J,
            F,
            j,
            f = function () {
              var g = e.now() - F;
              g < D
                ? (V = setTimeout(f, D - g))
                : ((V = null), G || ((j = b.apply(J, $)), (J = $ = null)));
            };
          return function () {
            (J = this), ($ = arguments), (F = e.now());
            var g = G && !V;
            return (
              V || (V = setTimeout(f, D)),
              g && ((j = b.apply(J, $)), (J = $ = null)),
              j
            );
          };
        }),
        (e.defaults = function (b) {
          if (!e.isObject(b)) return b;
          for (var D = 1, G = arguments.length; D < G; D++) {
            var V = arguments[D];
            for (var $ in V) b[$] === void 0 && (b[$] = V[$]);
          }
          return b;
        }),
        (e.keys = function (b) {
          if (!e.isObject(b)) return [];
          if (M) return M(b);
          var D = [];
          for (var G in b) e.has(b, G) && D.push(G);
          return D;
        }),
        (e.has = function (b, D) {
          return d.call(b, D);
        }),
        (e.isObject = function (b) {
          return b === Object(b);
        }),
        (e.now =
          Date.now ||
          function () {
            return new Date().getTime();
          }),
        (e.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g,
        });
      var H = /(.)^/,
        k = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029",
        },
        re = /\\|'|\r|\n|\u2028|\u2029/g,
        Z = function (b) {
          return "\\" + k[b];
        },
        X = /^\s*(\w|\$)+\s*$/;
      return (
        (e.template = function (b, D, G) {
          !D && G && (D = G), (D = e.defaults({}, D, e.templateSettings));
          var V = RegExp(
              [
                (D.escape || H).source,
                (D.interpolate || H).source,
                (D.evaluate || H).source,
              ].join("|") + "|$",
              "g"
            ),
            $ = 0,
            J = "__p+='";
          b.replace(V, function (g, _, E, B, z) {
            return (
              (J += b.slice($, z).replace(re, Z)),
              ($ = z + g.length),
              _
                ? (J +=
                    `'+
((__t=(` +
                    _ +
                    `))==null?'':_.escape(__t))+
'`)
                : E
                ? (J +=
                    `'+
((__t=(` +
                    E +
                    `))==null?'':__t)+
'`)
                : B &&
                  (J +=
                    `';
` +
                    B +
                    `
__p+='`),
              g
            );
          }),
            (J += `';
`);
          var F = D.variable;
          if (F) {
            if (!X.test(F))
              throw new Error("variable is not a bare identifier: " + F);
          } else
            (J =
              `with(obj||{}){
` +
              J +
              `}
`),
              (F = "obj");
          J =
            `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
` +
            J +
            `return __p;
`;
          var j;
          try {
            j = new Function(D.variable || "obj", "_", J);
          } catch (g) {
            throw ((g.source = J), g);
          }
          var f = function (g) {
            return j.call(this, g, e);
          };
          return (
            (f.source =
              "function(" +
              F +
              `){
` +
              J +
              "}"),
            f
          );
        }),
        e
      );
    })();
  });
  var $e = u((FW, Ls) => {
    var fe = {},
      Kt = {},
      zt = [],
      Ui = window.Webflow || [],
      Tt = window.jQuery,
      Ye = Tt(window),
      mI = Tt(document),
      ot = Tt.isFunction,
      ze = (fe._ = As()),
      Rs = (fe.tram = Gi() && Tt.tram),
      cn = !1,
      Vi = !1;
    Rs.config.hideBackface = !1;
    Rs.config.keepInherited = !0;
    fe.define = function (e, t, r) {
      Kt[e] && Ns(Kt[e]);
      var n = (Kt[e] = t(Tt, ze, r) || {});
      return Cs(n), n;
    };
    fe.require = function (e) {
      return Kt[e];
    };
    function Cs(e) {
      fe.env() &&
        (ot(e.design) && Ye.on("__wf_design", e.design),
        ot(e.preview) && Ye.on("__wf_preview", e.preview)),
        ot(e.destroy) && Ye.on("__wf_destroy", e.destroy),
        e.ready && ot(e.ready) && TI(e);
    }
    function TI(e) {
      if (cn) {
        e.ready();
        return;
      }
      ze.contains(zt, e.ready) || zt.push(e.ready);
    }
    function Ns(e) {
      ot(e.design) && Ye.off("__wf_design", e.design),
        ot(e.preview) && Ye.off("__wf_preview", e.preview),
        ot(e.destroy) && Ye.off("__wf_destroy", e.destroy),
        e.ready && ot(e.ready) && OI(e);
    }
    function OI(e) {
      zt = ze.filter(zt, function (t) {
        return t !== e.ready;
      });
    }
    fe.push = function (e) {
      if (cn) {
        ot(e) && e();
        return;
      }
      Ui.push(e);
    };
    fe.env = function (e) {
      var t = window.__wf_design,
        r = typeof t < "u";
      if (!e) return r;
      if (e === "design") return r && t;
      if (e === "preview") return r && !t;
      if (e === "slug") return r && window.__wf_slug;
      if (e === "editor") return window.WebflowEditor;
      if (e === "test") return window.__wf_test;
      if (e === "frame") return window !== window.top;
    };
    var un = navigator.userAgent.toLowerCase(),
      Ps = (fe.env.touch =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)),
      bI = (fe.env.chrome =
        /chrome/.test(un) &&
        /Google/.test(navigator.vendor) &&
        parseInt(un.match(/chrome\/(\d+)\./)[1], 10)),
      SI = (fe.env.ios = /(ipod|iphone|ipad)/.test(un));
    fe.env.safari = /safari/.test(un) && !bI && !SI;
    var Xi;
    Ps &&
      mI.on("touchstart mousedown", function (e) {
        Xi = e.target;
      });
    fe.validClick = Ps
      ? function (e) {
          return e === Xi || Tt.contains(e, Xi);
        }
      : function () {
          return !0;
        };
    var qs = "resize.webflow orientationchange.webflow load.webflow",
      AI = "scroll.webflow " + qs;
    fe.resize = Wi(Ye, qs);
    fe.scroll = Wi(Ye, AI);
    fe.redraw = Wi();
    function Wi(e, t) {
      var r = [],
        n = {};
      return (
        (n.up = ze.throttle(function (a) {
          ze.each(r, function (i) {
            i(a);
          });
        })),
        e && t && e.on(t, n.up),
        (n.on = function (a) {
          typeof a == "function" && (ze.contains(r, a) || r.push(a));
        }),
        (n.off = function (a) {
          if (!arguments.length) {
            r = [];
            return;
          }
          r = ze.filter(r, function (i) {
            return i !== a;
          });
        }),
        n
      );
    }
    fe.location = function (e) {
      window.location = e;
    };
    fe.env() && (fe.location = function () {});
    fe.ready = function () {
      (cn = !0), Vi ? wI() : ze.each(zt, ws), ze.each(Ui, ws), fe.resize.up();
    };
    function ws(e) {
      ot(e) && e();
    }
    function wI() {
      (Vi = !1), ze.each(Kt, Cs);
    }
    var xt;
    fe.load = function (e) {
      xt.then(e);
    };
    function xs() {
      xt && (xt.reject(), Ye.off("load", xt.resolve)),
        (xt = new Tt.Deferred()),
        Ye.on("load", xt.resolve);
    }
    fe.destroy = function (e) {
      (e = e || {}),
        (Vi = !0),
        Ye.triggerHandler("__wf_destroy"),
        e.domready != null && (cn = e.domready),
        ze.each(Kt, Ns),
        fe.resize.off(),
        fe.scroll.off(),
        fe.redraw.off(),
        (zt = []),
        (Ui = []),
        xt.state() === "pending" && xs();
    };
    Tt(fe.ready);
    xs();
    Ls.exports = window.Webflow = fe;
  });
  var Fs = u((GW, Ds) => {
    var Ms = $e();
    Ms.define(
      "brand",
      (Ds.exports = function (e) {
        var t = {},
          r = document,
          n = e("html"),
          a = e("body"),
          i = ".w-webflow-badge",
          o = window.location,
          s = /PhantomJS/i.test(navigator.userAgent),
          c =
            "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange",
          d;
        t.ready = function () {
          var I = n.attr("data-wf-status"),
            m = n.attr("data-wf-domain") || "";
          /\.webflow\.io$/i.test(m) && o.hostname !== m && (I = !0),
            I &&
              !s &&
              ((d = d || p()),
              h(),
              setTimeout(h, 500),
              e(r).off(c, v).on(c, v));
        };
        function v() {
          var I =
            r.fullScreen ||
            r.mozFullScreen ||
            r.webkitIsFullScreen ||
            r.msFullscreenElement ||
            !!r.webkitFullscreenElement;
          e(d).attr("style", I ? "display: none !important;" : "");
        }
        function p() {
          var I = e().attr("href", ""),
            m = e("<img>")
              .attr("src", "")
              .attr("alt", "")
              .css({ marginRight: "8px", width: "16px" }),
            T = e("<img>").attr("src", "").attr("alt", "");
          return I.append(m, T), I[0];
        }
        function h() {
          var I = a.children(i),
            m = I.length && I.get(0) === d,
            T = Ms.env("editor");
          if (m) {
            T && I.remove();
            return;
          }
          I.length && I.remove(), T || a.append(d);
        }
        return t;
      })
    );
  });
  var Xs = u((XW, Gs) => {
    var Bi = $e();
    Bi.define(
      "edit",
      (Gs.exports = function (e, t, r) {
        if (
          ((r = r || {}),
          (Bi.env("test") || Bi.env("frame")) && !r.fixture && !RI())
        )
          return { exit: 1 };
        var n = {},
          a = e(window),
          i = e(document.documentElement),
          o = document.location,
          s = "hashchange",
          c,
          d = r.load || h,
          v = !1;
        try {
          v =
            localStorage &&
            localStorage.getItem &&
            localStorage.getItem("WebflowEditor");
        } catch {}
        v
          ? d()
          : o.search
          ? (/[?&](edit)(?:[=&?]|$)/.test(o.search) ||
              /\?edit$/.test(o.href)) &&
            d()
          : a.on(s, p).triggerHandler(s);
        function p() {
          c || (/\?edit/.test(o.hash) && d());
        }
        function h() {
          (c = !0),
            (window.WebflowEditor = !0),
            a.off(s, p),
            N(function (M) {
              e.ajax({
                url: C("https://editor-api.webflow.com/api/editor/view"),
                data: { siteId: i.attr("data-wf-site") },
                xhrFields: { withCredentials: !0 },
                dataType: "json",
                crossDomain: !0,
                success: I(M),
              });
            });
        }
        function I(M) {
          return function (q) {
            if (!q) {
              console.error("Could not load editor data");
              return;
            }
            (q.thirdPartyCookiesSupported = M),
              m(L(q.bugReporterScriptPath), function () {
                m(L(q.scriptPath), function () {
                  window.WebflowEditor(q);
                });
              });
          };
        }
        function m(M, q) {
          e.ajax({ type: "GET", url: M, dataType: "script", cache: !0 }).then(
            q,
            T
          );
        }
        function T(M, q, x) {
          throw (console.error("Could not load editor script: " + q), x);
        }
        function L(M) {
          return M.indexOf("//") >= 0
            ? M
            : C("https://editor-api.webflow.com" + M);
        }
        function C(M) {
          return M.replace(/([^:])\/\//g, "$1/");
        }
        function N(M) {
          var q = window.document.createElement("iframe");
          (q.src = ""),
            (q.style.display = "none"),
            (q.sandbox = "allow-scripts allow-same-origin");
          var x = function (U) {
            U.data === "WF_third_party_cookies_unsupported"
              ? (A(q, x), M(!1))
              : U.data === "WF_third_party_cookies_supported" &&
                (A(q, x), M(!0));
          };
          (q.onerror = function () {
            A(q, x), M(!1);
          }),
            window.addEventListener("message", x, !1),
            window.document.body.appendChild(q);
        }
        function A(M, q) {
          window.removeEventListener("message", q, !1), M.remove();
        }
        return n;
      })
    );
    function RI() {
      try {
        return window.top.__Cypress__;
      } catch {
        return !1;
      }
    }
  });
  var Vs = u((UW, Us) => {
    var CI = $e();
    CI.define(
      "focus-visible",
      (Us.exports = function () {
        function e(r) {
          var n = !0,
            a = !1,
            i = null,
            o = {
              text: !0,
              search: !0,
              url: !0,
              tel: !0,
              email: !0,
              password: !0,
              number: !0,
              date: !0,
              month: !0,
              week: !0,
              time: !0,
              datetime: !0,
              "datetime-local": !0,
            };
          function s(A) {
            return !!(
              A &&
              A !== document &&
              A.nodeName !== "HTML" &&
              A.nodeName !== "BODY" &&
              "classList" in A &&
              "contains" in A.classList
            );
          }
          function c(A) {
            var M = A.type,
              q = A.tagName;
            return !!(
              (q === "INPUT" && o[M] && !A.readOnly) ||
              (q === "TEXTAREA" && !A.readOnly) ||
              A.isContentEditable
            );
          }
          function d(A) {
            A.getAttribute("data-wf-focus-visible") ||
              A.setAttribute("data-wf-focus-visible", "true");
          }
          function v(A) {
            A.getAttribute("data-wf-focus-visible") &&
              A.removeAttribute("data-wf-focus-visible");
          }
          function p(A) {
            A.metaKey ||
              A.altKey ||
              A.ctrlKey ||
              (s(r.activeElement) && d(r.activeElement), (n = !0));
          }
          function h() {
            n = !1;
          }
          function I(A) {
            s(A.target) && (n || c(A.target)) && d(A.target);
          }
          function m(A) {
            s(A.target) &&
              A.target.hasAttribute("data-wf-focus-visible") &&
              ((a = !0),
              window.clearTimeout(i),
              (i = window.setTimeout(function () {
                a = !1;
              }, 100)),
              v(A.target));
          }
          function T() {
            document.visibilityState === "hidden" && (a && (n = !0), L());
          }
          function L() {
            document.addEventListener("mousemove", N),
              document.addEventListener("mousedown", N),
              document.addEventListener("mouseup", N),
              document.addEventListener("pointermove", N),
              document.addEventListener("pointerdown", N),
              document.addEventListener("pointerup", N),
              document.addEventListener("touchmove", N),
              document.addEventListener("touchstart", N),
              document.addEventListener("touchend", N);
          }
          function C() {
            document.removeEventListener("mousemove", N),
              document.removeEventListener("mousedown", N),
              document.removeEventListener("mouseup", N),
              document.removeEventListener("pointermove", N),
              document.removeEventListener("pointerdown", N),
              document.removeEventListener("pointerup", N),
              document.removeEventListener("touchmove", N),
              document.removeEventListener("touchstart", N),
              document.removeEventListener("touchend", N);
          }
          function N(A) {
            (A.target.nodeName && A.target.nodeName.toLowerCase() === "html") ||
              ((n = !1), C());
          }
          document.addEventListener("keydown", p, !0),
            document.addEventListener("mousedown", h, !0),
            document.addEventListener("pointerdown", h, !0),
            document.addEventListener("touchstart", h, !0),
            document.addEventListener("visibilitychange", T, !0),
            L(),
            r.addEventListener("focus", I, !0),
            r.addEventListener("blur", m, !0);
        }
        function t() {
          if (typeof document < "u")
            try {
              document.querySelector(":focus-visible");
            } catch {
              e(document);
            }
        }
        return { ready: t };
      })
    );
  });
  var js = u((VW, Bs) => {
    var Ws = $e();
    Ws.define(
      "focus",
      (Bs.exports = function () {
        var e = [],
          t = !1;
        function r(o) {
          t &&
            (o.preventDefault(),
            o.stopPropagation(),
            o.stopImmediatePropagation(),
            e.unshift(o));
        }
        function n(o) {
          var s = o.target,
            c = s.tagName;
          return (
            (/^a$/i.test(c) && s.href != null) ||
            (/^(button|textarea)$/i.test(c) && s.disabled !== !0) ||
            (/^input$/i.test(c) &&
              /^(button|reset|submit|radio|checkbox)$/i.test(s.type) &&
              !s.disabled) ||
            (!/^(button|input|textarea|select|a)$/i.test(c) &&
              !Number.isNaN(Number.parseFloat(s.tabIndex))) ||
            /^audio$/i.test(c) ||
            (/^video$/i.test(c) && s.controls === !0)
          );
        }
        function a(o) {
          n(o) &&
            ((t = !0),
            setTimeout(() => {
              for (t = !1, o.target.focus(); e.length > 0; ) {
                var s = e.pop();
                s.target.dispatchEvent(new MouseEvent(s.type, s));
              }
            }, 0));
        }
        function i() {
          typeof document < "u" &&
            document.body.hasAttribute("data-wf-focus-within") &&
            Ws.env.safari &&
            (document.addEventListener("mousedown", a, !0),
            document.addEventListener("mouseup", r, !0),
            document.addEventListener("click", r, !0));
        }
        return { ready: i };
      })
    );
  });
  var Ks = u((WW, ks) => {
    "use strict";
    var ji = window.jQuery,
      st = {},
      ln = [],
      Hs = ".w-ix",
      fn = {
        reset: function (e, t) {
          t.__wf_intro = null;
        },
        intro: function (e, t) {
          t.__wf_intro ||
            ((t.__wf_intro = !0), ji(t).triggerHandler(st.types.INTRO));
        },
        outro: function (e, t) {
          t.__wf_intro &&
            ((t.__wf_intro = null), ji(t).triggerHandler(st.types.OUTRO));
        },
      };
    st.triggers = {};
    st.types = { INTRO: "w-ix-intro" + Hs, OUTRO: "w-ix-outro" + Hs };
    st.init = function () {
      for (var e = ln.length, t = 0; t < e; t++) {
        var r = ln[t];
        r[0](0, r[1]);
      }
      (ln = []), ji.extend(st.triggers, fn);
    };
    st.async = function () {
      for (var e in fn) {
        var t = fn[e];
        fn.hasOwnProperty(e) &&
          (st.triggers[e] = function (r, n) {
            ln.push([t, n]);
          });
      }
    };
    st.async();
    ks.exports = st;
  });
  var ki = u((BW, $s) => {
    "use strict";
    var Hi = Ks();
    function zs(e, t) {
      var r = document.createEvent("CustomEvent");
      r.initCustomEvent(t, !0, !0, null), e.dispatchEvent(r);
    }
    var NI = window.jQuery,
      dn = {},
      Ys = ".w-ix",
      PI = {
        reset: function (e, t) {
          Hi.triggers.reset(e, t);
        },
        intro: function (e, t) {
          Hi.triggers.intro(e, t), zs(t, "COMPONENT_ACTIVE");
        },
        outro: function (e, t) {
          Hi.triggers.outro(e, t), zs(t, "COMPONENT_INACTIVE");
        },
      };
    dn.triggers = {};
    dn.types = { INTRO: "w-ix-intro" + Ys, OUTRO: "w-ix-outro" + Ys };
    NI.extend(dn.triggers, PI);
    $s.exports = dn;
  });
  var Qs = u((jW, gt) => {
    function Ki(e) {
      return (
        (gt.exports = Ki =
          typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  typeof Symbol == "function" &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        (gt.exports.__esModule = !0),
        (gt.exports.default = gt.exports),
        Ki(e)
      );
    }
    (gt.exports = Ki),
      (gt.exports.__esModule = !0),
      (gt.exports.default = gt.exports);
  });
  var Lt = u((HW, Sr) => {
    var qI = Qs().default;
    function Zs(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        r = new WeakMap();
      return (Zs = function (a) {
        return a ? r : t;
      })(e);
    }
    function xI(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (qI(e) !== "object" && typeof e != "function"))
        return { default: e };
      var r = Zs(t);
      if (r && r.has(e)) return r.get(e);
      var n = {},
        a = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var i in e)
        if (i !== "default" && Object.prototype.hasOwnProperty.call(e, i)) {
          var o = a ? Object.getOwnPropertyDescriptor(e, i) : null;
          o && (o.get || o.set)
            ? Object.defineProperty(n, i, o)
            : (n[i] = e[i]);
        }
      return (n.default = e), r && r.set(e, n), n;
    }
    (Sr.exports = xI),
      (Sr.exports.__esModule = !0),
      (Sr.exports.default = Sr.exports);
  });
  var Qe = u((kW, Ar) => {
    function LI(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (Ar.exports = LI),
      (Ar.exports.__esModule = !0),
      (Ar.exports.default = Ar.exports);
  });
  var Ee = u((KW, Js) => {
    var pn = function (e) {
      return e && e.Math == Math && e;
    };
    Js.exports =
      pn(typeof globalThis == "object" && globalThis) ||
      pn(typeof window == "object" && window) ||
      pn(typeof self == "object" && self) ||
      pn(typeof global == "object" && global) ||
      (function () {
        return this;
      })() ||
      Function("return this")();
  });
  var Yt = u((zW, eu) => {
    eu.exports = function (e) {
      try {
        return !!e();
      } catch {
        return !0;
      }
    };
  });
  var Mt = u((YW, tu) => {
    var MI = Yt();
    tu.exports = !MI(function () {
      return (
        Object.defineProperty({}, 1, {
          get: function () {
            return 7;
          },
        })[1] != 7
      );
    });
  });
  var vn = u(($W, ru) => {
    var wr = Function.prototype.call;
    ru.exports = wr.bind
      ? wr.bind(wr)
      : function () {
          return wr.apply(wr, arguments);
        };
  });
  var ou = u((au) => {
    "use strict";
    var nu = {}.propertyIsEnumerable,
      iu = Object.getOwnPropertyDescriptor,
      DI = iu && !nu.call({ 1: 2 }, 1);
    au.f = DI
      ? function (t) {
          var r = iu(this, t);
          return !!r && r.enumerable;
        }
      : nu;
  });
  var zi = u((ZW, su) => {
    su.exports = function (e, t) {
      return {
        enumerable: !(e & 1),
        configurable: !(e & 2),
        writable: !(e & 4),
        value: t,
      };
    };
  });
  var Ze = u((JW, cu) => {
    var uu = Function.prototype,
      Yi = uu.bind,
      $i = uu.call,
      FI = Yi && Yi.bind($i);
    cu.exports = Yi
      ? function (e) {
          return e && FI($i, e);
        }
      : function (e) {
          return (
            e &&
            function () {
              return $i.apply(e, arguments);
            }
          );
        };
  });
  var du = u((eB, fu) => {
    var lu = Ze(),
      GI = lu({}.toString),
      XI = lu("".slice);
    fu.exports = function (e) {
      return XI(GI(e), 8, -1);
    };
  });
  var vu = u((tB, pu) => {
    var UI = Ee(),
      VI = Ze(),
      WI = Yt(),
      BI = du(),
      Qi = UI.Object,
      jI = VI("".split);
    pu.exports = WI(function () {
      return !Qi("z").propertyIsEnumerable(0);
    })
      ? function (e) {
          return BI(e) == "String" ? jI(e, "") : Qi(e);
        }
      : Qi;
  });
  var Zi = u((rB, hu) => {
    var HI = Ee(),
      kI = HI.TypeError;
    hu.exports = function (e) {
      if (e == null) throw kI("Can't call method on " + e);
      return e;
    };
  });
  var Rr = u((nB, Eu) => {
    var KI = vu(),
      zI = Zi();
    Eu.exports = function (e) {
      return KI(zI(e));
    };
  });
  var ut = u((iB, gu) => {
    gu.exports = function (e) {
      return typeof e == "function";
    };
  });
  var $t = u((aB, _u) => {
    var YI = ut();
    _u.exports = function (e) {
      return typeof e == "object" ? e !== null : YI(e);
    };
  });
  var Cr = u((oB, yu) => {
    var Ji = Ee(),
      $I = ut(),
      QI = function (e) {
        return $I(e) ? e : void 0;
      };
    yu.exports = function (e, t) {
      return arguments.length < 2 ? QI(Ji[e]) : Ji[e] && Ji[e][t];
    };
  });
  var mu = u((sB, Iu) => {
    var ZI = Ze();
    Iu.exports = ZI({}.isPrototypeOf);
  });
  var Ou = u((uB, Tu) => {
    var JI = Cr();
    Tu.exports = JI("navigator", "userAgent") || "";
  });
  var Nu = u((cB, Cu) => {
    var Ru = Ee(),
      ea = Ou(),
      bu = Ru.process,
      Su = Ru.Deno,
      Au = (bu && bu.versions) || (Su && Su.version),
      wu = Au && Au.v8,
      Je,
      hn;
    wu &&
      ((Je = wu.split(".")),
      (hn = Je[0] > 0 && Je[0] < 4 ? 1 : +(Je[0] + Je[1])));
    !hn &&
      ea &&
      ((Je = ea.match(/Edge\/(\d+)/)),
      (!Je || Je[1] >= 74) &&
        ((Je = ea.match(/Chrome\/(\d+)/)), Je && (hn = +Je[1])));
    Cu.exports = hn;
  });
  var ta = u((lB, qu) => {
    var Pu = Nu(),
      em = Yt();
    qu.exports =
      !!Object.getOwnPropertySymbols &&
      !em(function () {
        var e = Symbol();
        return (
          !String(e) ||
          !(Object(e) instanceof Symbol) ||
          (!Symbol.sham && Pu && Pu < 41)
        );
      });
  });
  var ra = u((fB, xu) => {
    var tm = ta();
    xu.exports = tm && !Symbol.sham && typeof Symbol.iterator == "symbol";
  });
  var na = u((dB, Lu) => {
    var rm = Ee(),
      nm = Cr(),
      im = ut(),
      am = mu(),
      om = ra(),
      sm = rm.Object;
    Lu.exports = om
      ? function (e) {
          return typeof e == "symbol";
        }
      : function (e) {
          var t = nm("Symbol");
          return im(t) && am(t.prototype, sm(e));
        };
  });
  var Du = u((pB, Mu) => {
    var um = Ee(),
      cm = um.String;
    Mu.exports = function (e) {
      try {
        return cm(e);
      } catch {
        return "Object";
      }
    };
  });
  var Gu = u((vB, Fu) => {
    var lm = Ee(),
      fm = ut(),
      dm = Du(),
      pm = lm.TypeError;
    Fu.exports = function (e) {
      if (fm(e)) return e;
      throw pm(dm(e) + " is not a function");
    };
  });
  var Uu = u((hB, Xu) => {
    var vm = Gu();
    Xu.exports = function (e, t) {
      var r = e[t];
      return r == null ? void 0 : vm(r);
    };
  });
  var Wu = u((EB, Vu) => {
    var hm = Ee(),
      ia = vn(),
      aa = ut(),
      oa = $t(),
      Em = hm.TypeError;
    Vu.exports = function (e, t) {
      var r, n;
      if (
        (t === "string" && aa((r = e.toString)) && !oa((n = ia(r, e)))) ||
        (aa((r = e.valueOf)) && !oa((n = ia(r, e)))) ||
        (t !== "string" && aa((r = e.toString)) && !oa((n = ia(r, e))))
      )
        return n;
      throw Em("Can't convert object to primitive value");
    };
  });
  var ju = u((gB, Bu) => {
    Bu.exports = !1;
  });
  var En = u((_B, ku) => {
    var Hu = Ee(),
      gm = Object.defineProperty;
    ku.exports = function (e, t) {
      try {
        gm(Hu, e, { value: t, configurable: !0, writable: !0 });
      } catch {
        Hu[e] = t;
      }
      return t;
    };
  });
  var gn = u((yB, zu) => {
    var _m = Ee(),
      ym = En(),
      Ku = "__core-js_shared__",
      Im = _m[Ku] || ym(Ku, {});
    zu.exports = Im;
  });
  var sa = u((IB, $u) => {
    var mm = ju(),
      Yu = gn();
    ($u.exports = function (e, t) {
      return Yu[e] || (Yu[e] = t !== void 0 ? t : {});
    })("versions", []).push({
      version: "3.19.0",
      mode: mm ? "pure" : "global",
      copyright: "\xA9 2021 Denis Pushkarev (zloirock.ru)",
    });
  });
  var Zu = u((mB, Qu) => {
    var Tm = Ee(),
      Om = Zi(),
      bm = Tm.Object;
    Qu.exports = function (e) {
      return bm(Om(e));
    };
  });
  var Ot = u((TB, Ju) => {
    var Sm = Ze(),
      Am = Zu(),
      wm = Sm({}.hasOwnProperty);
    Ju.exports =
      Object.hasOwn ||
      function (t, r) {
        return wm(Am(t), r);
      };
  });
  var ua = u((OB, ec) => {
    var Rm = Ze(),
      Cm = 0,
      Nm = Math.random(),
      Pm = Rm((1).toString);
    ec.exports = function (e) {
      return "Symbol(" + (e === void 0 ? "" : e) + ")_" + Pm(++Cm + Nm, 36);
    };
  });
  var ca = u((bB, ac) => {
    var qm = Ee(),
      xm = sa(),
      tc = Ot(),
      Lm = ua(),
      rc = ta(),
      ic = ra(),
      Qt = xm("wks"),
      Dt = qm.Symbol,
      nc = Dt && Dt.for,
      Mm = ic ? Dt : (Dt && Dt.withoutSetter) || Lm;
    ac.exports = function (e) {
      if (!tc(Qt, e) || !(rc || typeof Qt[e] == "string")) {
        var t = "Symbol." + e;
        rc && tc(Dt, e)
          ? (Qt[e] = Dt[e])
          : ic && nc
          ? (Qt[e] = nc(t))
          : (Qt[e] = Mm(t));
      }
      return Qt[e];
    };
  });
  var cc = u((SB, uc) => {
    var Dm = Ee(),
      Fm = vn(),
      oc = $t(),
      sc = na(),
      Gm = Uu(),
      Xm = Wu(),
      Um = ca(),
      Vm = Dm.TypeError,
      Wm = Um("toPrimitive");
    uc.exports = function (e, t) {
      if (!oc(e) || sc(e)) return e;
      var r = Gm(e, Wm),
        n;
      if (r) {
        if (
          (t === void 0 && (t = "default"), (n = Fm(r, e, t)), !oc(n) || sc(n))
        )
          return n;
        throw Vm("Can't convert object to primitive value");
      }
      return t === void 0 && (t = "number"), Xm(e, t);
    };
  });
  var la = u((AB, lc) => {
    var Bm = cc(),
      jm = na();
    lc.exports = function (e) {
      var t = Bm(e, "string");
      return jm(t) ? t : t + "";
    };
  });
  var da = u((wB, dc) => {
    var Hm = Ee(),
      fc = $t(),
      fa = Hm.document,
      km = fc(fa) && fc(fa.createElement);
    dc.exports = function (e) {
      return km ? fa.createElement(e) : {};
    };
  });
  var pa = u((RB, pc) => {
    var Km = Mt(),
      zm = Yt(),
      Ym = da();
    pc.exports =
      !Km &&
      !zm(function () {
        return (
          Object.defineProperty(Ym("div"), "a", {
            get: function () {
              return 7;
            },
          }).a != 7
        );
      });
  });
  var va = u((hc) => {
    var $m = Mt(),
      Qm = vn(),
      Zm = ou(),
      Jm = zi(),
      eT = Rr(),
      tT = la(),
      rT = Ot(),
      nT = pa(),
      vc = Object.getOwnPropertyDescriptor;
    hc.f = $m
      ? vc
      : function (t, r) {
          if (((t = eT(t)), (r = tT(r)), nT))
            try {
              return vc(t, r);
            } catch {}
          if (rT(t, r)) return Jm(!Qm(Zm.f, t, r), t[r]);
        };
  });
  var Nr = u((NB, gc) => {
    var Ec = Ee(),
      iT = $t(),
      aT = Ec.String,
      oT = Ec.TypeError;
    gc.exports = function (e) {
      if (iT(e)) return e;
      throw oT(aT(e) + " is not an object");
    };
  });
  var Pr = u((Ic) => {
    var sT = Ee(),
      uT = Mt(),
      cT = pa(),
      _c = Nr(),
      lT = la(),
      fT = sT.TypeError,
      yc = Object.defineProperty;
    Ic.f = uT
      ? yc
      : function (t, r, n) {
          if ((_c(t), (r = lT(r)), _c(n), cT))
            try {
              return yc(t, r, n);
            } catch {}
          if ("get" in n || "set" in n) throw fT("Accessors not supported");
          return "value" in n && (t[r] = n.value), t;
        };
  });
  var _n = u((qB, mc) => {
    var dT = Mt(),
      pT = Pr(),
      vT = zi();
    mc.exports = dT
      ? function (e, t, r) {
          return pT.f(e, t, vT(1, r));
        }
      : function (e, t, r) {
          return (e[t] = r), e;
        };
  });
  var Ea = u((xB, Tc) => {
    var hT = Ze(),
      ET = ut(),
      ha = gn(),
      gT = hT(Function.toString);
    ET(ha.inspectSource) ||
      (ha.inspectSource = function (e) {
        return gT(e);
      });
    Tc.exports = ha.inspectSource;
  });
  var Sc = u((LB, bc) => {
    var _T = Ee(),
      yT = ut(),
      IT = Ea(),
      Oc = _T.WeakMap;
    bc.exports = yT(Oc) && /native code/.test(IT(Oc));
  });
  var ga = u((MB, wc) => {
    var mT = sa(),
      TT = ua(),
      Ac = mT("keys");
    wc.exports = function (e) {
      return Ac[e] || (Ac[e] = TT(e));
    };
  });
  var yn = u((DB, Rc) => {
    Rc.exports = {};
  });
  var Lc = u((FB, xc) => {
    var OT = Sc(),
      qc = Ee(),
      _a = Ze(),
      bT = $t(),
      ST = _n(),
      ya = Ot(),
      Ia = gn(),
      AT = ga(),
      wT = yn(),
      Cc = "Object already initialized",
      Ta = qc.TypeError,
      RT = qc.WeakMap,
      In,
      qr,
      mn,
      CT = function (e) {
        return mn(e) ? qr(e) : In(e, {});
      },
      NT = function (e) {
        return function (t) {
          var r;
          if (!bT(t) || (r = qr(t)).type !== e)
            throw Ta("Incompatible receiver, " + e + " required");
          return r;
        };
      };
    OT || Ia.state
      ? ((bt = Ia.state || (Ia.state = new RT())),
        (Nc = _a(bt.get)),
        (ma = _a(bt.has)),
        (Pc = _a(bt.set)),
        (In = function (e, t) {
          if (ma(bt, e)) throw new Ta(Cc);
          return (t.facade = e), Pc(bt, e, t), t;
        }),
        (qr = function (e) {
          return Nc(bt, e) || {};
        }),
        (mn = function (e) {
          return ma(bt, e);
        }))
      : ((Ft = AT("state")),
        (wT[Ft] = !0),
        (In = function (e, t) {
          if (ya(e, Ft)) throw new Ta(Cc);
          return (t.facade = e), ST(e, Ft, t), t;
        }),
        (qr = function (e) {
          return ya(e, Ft) ? e[Ft] : {};
        }),
        (mn = function (e) {
          return ya(e, Ft);
        }));
    var bt, Nc, ma, Pc, Ft;
    xc.exports = { set: In, get: qr, has: mn, enforce: CT, getterFor: NT };
  });
  var Fc = u((GB, Dc) => {
    var Oa = Mt(),
      PT = Ot(),
      Mc = Function.prototype,
      qT = Oa && Object.getOwnPropertyDescriptor,
      ba = PT(Mc, "name"),
      xT = ba && function () {}.name === "something",
      LT = ba && (!Oa || (Oa && qT(Mc, "name").configurable));
    Dc.exports = { EXISTS: ba, PROPER: xT, CONFIGURABLE: LT };
  });
  var Wc = u((XB, Vc) => {
    var MT = Ee(),
      Gc = ut(),
      DT = Ot(),
      Xc = _n(),
      FT = En(),
      GT = Ea(),
      Uc = Lc(),
      XT = Fc().CONFIGURABLE,
      UT = Uc.get,
      VT = Uc.enforce,
      WT = String(String).split("String");
    (Vc.exports = function (e, t, r, n) {
      var a = n ? !!n.unsafe : !1,
        i = n ? !!n.enumerable : !1,
        o = n ? !!n.noTargetGet : !1,
        s = n && n.name !== void 0 ? n.name : t,
        c;
      if (
        (Gc(r) &&
          (String(s).slice(0, 7) === "Symbol(" &&
            (s = "[" + String(s).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"),
          (!DT(r, "name") || (XT && r.name !== s)) && Xc(r, "name", s),
          (c = VT(r)),
          c.source || (c.source = WT.join(typeof s == "string" ? s : ""))),
        e === MT)
      ) {
        i ? (e[t] = r) : FT(t, r);
        return;
      } else a ? !o && e[t] && (i = !0) : delete e[t];
      i ? (e[t] = r) : Xc(e, t, r);
    })(Function.prototype, "toString", function () {
      return (Gc(this) && UT(this).source) || GT(this);
    });
  });
  var Sa = u((UB, Bc) => {
    var BT = Math.ceil,
      jT = Math.floor;
    Bc.exports = function (e) {
      var t = +e;
      return t !== t || t === 0 ? 0 : (t > 0 ? jT : BT)(t);
    };
  });
  var Hc = u((VB, jc) => {
    var HT = Sa(),
      kT = Math.max,
      KT = Math.min;
    jc.exports = function (e, t) {
      var r = HT(e);
      return r < 0 ? kT(r + t, 0) : KT(r, t);
    };
  });
  var Kc = u((WB, kc) => {
    var zT = Sa(),
      YT = Math.min;
    kc.exports = function (e) {
      return e > 0 ? YT(zT(e), 9007199254740991) : 0;
    };
  });
  var Yc = u((BB, zc) => {
    var $T = Kc();
    zc.exports = function (e) {
      return $T(e.length);
    };
  });
  var Aa = u((jB, Qc) => {
    var QT = Rr(),
      ZT = Hc(),
      JT = Yc(),
      $c = function (e) {
        return function (t, r, n) {
          var a = QT(t),
            i = JT(a),
            o = ZT(n, i),
            s;
          if (e && r != r) {
            for (; i > o; ) if (((s = a[o++]), s != s)) return !0;
          } else
            for (; i > o; o++)
              if ((e || o in a) && a[o] === r) return e || o || 0;
          return !e && -1;
        };
      };
    Qc.exports = { includes: $c(!0), indexOf: $c(!1) };
  });
  var Ra = u((HB, Jc) => {
    var eO = Ze(),
      wa = Ot(),
      tO = Rr(),
      rO = Aa().indexOf,
      nO = yn(),
      Zc = eO([].push);
    Jc.exports = function (e, t) {
      var r = tO(e),
        n = 0,
        a = [],
        i;
      for (i in r) !wa(nO, i) && wa(r, i) && Zc(a, i);
      for (; t.length > n; ) wa(r, (i = t[n++])) && (~rO(a, i) || Zc(a, i));
      return a;
    };
  });
  var Tn = u((kB, el) => {
    el.exports = [
      "constructor",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toLocaleString",
      "toString",
      "valueOf",
    ];
  });
  var rl = u((tl) => {
    var iO = Ra(),
      aO = Tn(),
      oO = aO.concat("length", "prototype");
    tl.f =
      Object.getOwnPropertyNames ||
      function (t) {
        return iO(t, oO);
      };
  });
  var il = u((nl) => {
    nl.f = Object.getOwnPropertySymbols;
  });
  var ol = u((YB, al) => {
    var sO = Cr(),
      uO = Ze(),
      cO = rl(),
      lO = il(),
      fO = Nr(),
      dO = uO([].concat);
    al.exports =
      sO("Reflect", "ownKeys") ||
      function (t) {
        var r = cO.f(fO(t)),
          n = lO.f;
        return n ? dO(r, n(t)) : r;
      };
  });
  var ul = u(($B, sl) => {
    var pO = Ot(),
      vO = ol(),
      hO = va(),
      EO = Pr();
    sl.exports = function (e, t) {
      for (var r = vO(t), n = EO.f, a = hO.f, i = 0; i < r.length; i++) {
        var o = r[i];
        pO(e, o) || n(e, o, a(t, o));
      }
    };
  });
  var ll = u((QB, cl) => {
    var gO = Yt(),
      _O = ut(),
      yO = /#|\.prototype\./,
      xr = function (e, t) {
        var r = mO[IO(e)];
        return r == OO ? !0 : r == TO ? !1 : _O(t) ? gO(t) : !!t;
      },
      IO = (xr.normalize = function (e) {
        return String(e).replace(yO, ".").toLowerCase();
      }),
      mO = (xr.data = {}),
      TO = (xr.NATIVE = "N"),
      OO = (xr.POLYFILL = "P");
    cl.exports = xr;
  });
  var dl = u((ZB, fl) => {
    var Ca = Ee(),
      bO = va().f,
      SO = _n(),
      AO = Wc(),
      wO = En(),
      RO = ul(),
      CO = ll();
    fl.exports = function (e, t) {
      var r = e.target,
        n = e.global,
        a = e.stat,
        i,
        o,
        s,
        c,
        d,
        v;
      if (
        (n
          ? (o = Ca)
          : a
          ? (o = Ca[r] || wO(r, {}))
          : (o = (Ca[r] || {}).prototype),
        o)
      )
        for (s in t) {
          if (
            ((d = t[s]),
            e.noTargetGet ? ((v = bO(o, s)), (c = v && v.value)) : (c = o[s]),
            (i = CO(n ? s : r + (a ? "." : "#") + s, e.forced)),
            !i && c !== void 0)
          ) {
            if (typeof d == typeof c) continue;
            RO(d, c);
          }
          (e.sham || (c && c.sham)) && SO(d, "sham", !0), AO(o, s, d, e);
        }
    };
  });
  var vl = u((JB, pl) => {
    var NO = Ra(),
      PO = Tn();
    pl.exports =
      Object.keys ||
      function (t) {
        return NO(t, PO);
      };
  });
  var El = u((e5, hl) => {
    var qO = Mt(),
      xO = Pr(),
      LO = Nr(),
      MO = Rr(),
      DO = vl();
    hl.exports = qO
      ? Object.defineProperties
      : function (t, r) {
          LO(t);
          for (var n = MO(r), a = DO(r), i = a.length, o = 0, s; i > o; )
            xO.f(t, (s = a[o++]), n[s]);
          return t;
        };
  });
  var _l = u((t5, gl) => {
    var FO = Cr();
    gl.exports = FO("document", "documentElement");
  });
  var Al = u((r5, Sl) => {
    var GO = Nr(),
      XO = El(),
      yl = Tn(),
      UO = yn(),
      VO = _l(),
      WO = da(),
      BO = ga(),
      Il = ">",
      ml = "<",
      Pa = "prototype",
      qa = "script",
      Ol = BO("IE_PROTO"),
      Na = function () {},
      bl = function (e) {
        return ml + qa + Il + e + ml + "/" + qa + Il;
      },
      Tl = function (e) {
        e.write(bl("")), e.close();
        var t = e.parentWindow.Object;
        return (e = null), t;
      },
      jO = function () {
        var e = WO("iframe"),
          t = "java" + qa + ":",
          r;
        return (
          (e.style.display = "none"),
          VO.appendChild(e),
          (e.src = String(t)),
          (r = e.contentWindow.document),
          r.open(),
          r.write(bl("document.F=Object")),
          r.close(),
          r.F
        );
      },
      On,
      bn = function () {
        try {
          On = new ActiveXObject("htmlfile");
        } catch {}
        bn =
          typeof document < "u"
            ? document.domain && On
              ? Tl(On)
              : jO()
            : Tl(On);
        for (var e = yl.length; e--; ) delete bn[Pa][yl[e]];
        return bn();
      };
    UO[Ol] = !0;
    Sl.exports =
      Object.create ||
      function (t, r) {
        var n;
        return (
          t !== null
            ? ((Na[Pa] = GO(t)), (n = new Na()), (Na[Pa] = null), (n[Ol] = t))
            : (n = bn()),
          r === void 0 ? n : XO(n, r)
        );
      };
  });
  var Rl = u((n5, wl) => {
    var HO = ca(),
      kO = Al(),
      KO = Pr(),
      xa = HO("unscopables"),
      La = Array.prototype;
    La[xa] == null && KO.f(La, xa, { configurable: !0, value: kO(null) });
    wl.exports = function (e) {
      La[xa][e] = !0;
    };
  });
  var Cl = u(() => {
    "use strict";
    var zO = dl(),
      YO = Aa().includes,
      $O = Rl();
    zO(
      { target: "Array", proto: !0 },
      {
        includes: function (t) {
          return YO(this, t, arguments.length > 1 ? arguments[1] : void 0);
        },
      }
    );
    $O("includes");
  });
  var Pl = u((o5, Nl) => {
    var QO = Ee(),
      ZO = Ze();
    Nl.exports = function (e, t) {
      return ZO(QO[e].prototype[t]);
    };
  });
  var xl = u((s5, ql) => {
    Cl();
    var JO = Pl();
    ql.exports = JO("Array", "includes");
  });
  var Ml = u((u5, Ll) => {
    var eb = xl();
    Ll.exports = eb;
  });
  var Fl = u((c5, Dl) => {
    var tb = Ml();
    Dl.exports = tb;
  });
  var Ma = u((l5, Gl) => {
    var rb =
      typeof global == "object" && global && global.Object === Object && global;
    Gl.exports = rb;
  });
  var et = u((f5, Xl) => {
    var nb = Ma(),
      ib = typeof self == "object" && self && self.Object === Object && self,
      ab = nb || ib || Function("return this")();
    Xl.exports = ab;
  });
  var Zt = u((d5, Ul) => {
    var ob = et(),
      sb = ob.Symbol;
    Ul.exports = sb;
  });
  var jl = u((p5, Bl) => {
    var Vl = Zt(),
      Wl = Object.prototype,
      ub = Wl.hasOwnProperty,
      cb = Wl.toString,
      Lr = Vl ? Vl.toStringTag : void 0;
    function lb(e) {
      var t = ub.call(e, Lr),
        r = e[Lr];
      try {
        e[Lr] = void 0;
        var n = !0;
      } catch {}
      var a = cb.call(e);
      return n && (t ? (e[Lr] = r) : delete e[Lr]), a;
    }
    Bl.exports = lb;
  });
  var kl = u((v5, Hl) => {
    var fb = Object.prototype,
      db = fb.toString;
    function pb(e) {
      return db.call(e);
    }
    Hl.exports = pb;
  });
  var St = u((h5, Yl) => {
    var Kl = Zt(),
      vb = jl(),
      hb = kl(),
      Eb = "[object Null]",
      gb = "[object Undefined]",
      zl = Kl ? Kl.toStringTag : void 0;
    function _b(e) {
      return e == null
        ? e === void 0
          ? gb
          : Eb
        : zl && zl in Object(e)
        ? vb(e)
        : hb(e);
    }
    Yl.exports = _b;
  });
  var Da = u((E5, $l) => {
    function yb(e, t) {
      return function (r) {
        return e(t(r));
      };
    }
    $l.exports = yb;
  });
  var Fa = u((g5, Ql) => {
    var Ib = Da(),
      mb = Ib(Object.getPrototypeOf, Object);
    Ql.exports = mb;
  });
  var _t = u((_5, Zl) => {
    function Tb(e) {
      return e != null && typeof e == "object";
    }
    Zl.exports = Tb;
  });
  var Ga = u((y5, ef) => {
    var Ob = St(),
      bb = Fa(),
      Sb = _t(),
      Ab = "[object Object]",
      wb = Function.prototype,
      Rb = Object.prototype,
      Jl = wb.toString,
      Cb = Rb.hasOwnProperty,
      Nb = Jl.call(Object);
    function Pb(e) {
      if (!Sb(e) || Ob(e) != Ab) return !1;
      var t = bb(e);
      if (t === null) return !0;
      var r = Cb.call(t, "constructor") && t.constructor;
      return typeof r == "function" && r instanceof r && Jl.call(r) == Nb;
    }
    ef.exports = Pb;
  });
  var tf = u((Xa) => {
    "use strict";
    Object.defineProperty(Xa, "__esModule", { value: !0 });
    Xa.default = qb;
    function qb(e) {
      var t,
        r = e.Symbol;
      return (
        typeof r == "function"
          ? r.observable
            ? (t = r.observable)
            : ((t = r("observable")), (r.observable = t))
          : (t = "@@observable"),
        t
      );
    }
  });
  var rf = u((Va, Ua) => {
    "use strict";
    Object.defineProperty(Va, "__esModule", { value: !0 });
    var xb = tf(),
      Lb = Mb(xb);
    function Mb(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var Jt;
    typeof self < "u"
      ? (Jt = self)
      : typeof window < "u"
      ? (Jt = window)
      : typeof global < "u"
      ? (Jt = global)
      : typeof Ua < "u"
      ? (Jt = Ua)
      : (Jt = Function("return this")());
    var Db = (0, Lb.default)(Jt);
    Va.default = Db;
  });
  var Wa = u((Mr) => {
    "use strict";
    Mr.__esModule = !0;
    Mr.ActionTypes = void 0;
    Mr.default = sf;
    var Fb = Ga(),
      Gb = of(Fb),
      Xb = rf(),
      nf = of(Xb);
    function of(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var af = (Mr.ActionTypes = { INIT: "@@redux/INIT" });
    function sf(e, t, r) {
      var n;
      if (
        (typeof t == "function" && typeof r > "u" && ((r = t), (t = void 0)),
        typeof r < "u")
      ) {
        if (typeof r != "function")
          throw new Error("Expected the enhancer to be a function.");
        return r(sf)(e, t);
      }
      if (typeof e != "function")
        throw new Error("Expected the reducer to be a function.");
      var a = e,
        i = t,
        o = [],
        s = o,
        c = !1;
      function d() {
        s === o && (s = o.slice());
      }
      function v() {
        return i;
      }
      function p(T) {
        if (typeof T != "function")
          throw new Error("Expected listener to be a function.");
        var L = !0;
        return (
          d(),
          s.push(T),
          function () {
            if (L) {
              (L = !1), d();
              var N = s.indexOf(T);
              s.splice(N, 1);
            }
          }
        );
      }
      function h(T) {
        if (!(0, Gb.default)(T))
          throw new Error(
            "Actions must be plain objects. Use custom middleware for async actions."
          );
        if (typeof T.type > "u")
          throw new Error(
            'Actions may not have an undefined "type" property. Have you misspelled a constant?'
          );
        if (c) throw new Error("Reducers may not dispatch actions.");
        try {
          (c = !0), (i = a(i, T));
        } finally {
          c = !1;
        }
        for (var L = (o = s), C = 0; C < L.length; C++) L[C]();
        return T;
      }
      function I(T) {
        if (typeof T != "function")
          throw new Error("Expected the nextReducer to be a function.");
        (a = T), h({ type: af.INIT });
      }
      function m() {
        var T,
          L = p;
        return (
          (T = {
            subscribe: function (N) {
              if (typeof N != "object")
                throw new TypeError("Expected the observer to be an object.");
              function A() {
                N.next && N.next(v());
              }
              A();
              var M = L(A);
              return { unsubscribe: M };
            },
          }),
          (T[nf.default] = function () {
            return this;
          }),
          T
        );
      }
      return (
        h({ type: af.INIT }),
        (n = { dispatch: h, subscribe: p, getState: v, replaceReducer: I }),
        (n[nf.default] = m),
        n
      );
    }
  });
  var ja = u((Ba) => {
    "use strict";
    Ba.__esModule = !0;
    Ba.default = Ub;
    function Ub(e) {
      typeof console < "u" &&
        typeof console.error == "function" &&
        console.error(e);
      try {
        throw new Error(e);
      } catch {}
    }
  });
  var lf = u((Ha) => {
    "use strict";
    Ha.__esModule = !0;
    Ha.default = Hb;
    var uf = Wa(),
      Vb = Ga(),
      O5 = cf(Vb),
      Wb = ja(),
      b5 = cf(Wb);
    function cf(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function Bb(e, t) {
      var r = t && t.type,
        n = (r && '"' + r.toString() + '"') || "an action";
      return (
        "Given action " +
        n +
        ', reducer "' +
        e +
        '" returned undefined. To ignore an action, you must explicitly return the previous state.'
      );
    }
    function jb(e) {
      Object.keys(e).forEach(function (t) {
        var r = e[t],
          n = r(void 0, { type: uf.ActionTypes.INIT });
        if (typeof n > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.'
          );
        var a =
          "@@redux/PROBE_UNKNOWN_ACTION_" +
          Math.random().toString(36).substring(7).split("").join(".");
        if (typeof r(void 0, { type: a }) > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined when probed with a random type. ' +
              ("Don't try to handle " +
                uf.ActionTypes.INIT +
                ' or other actions in "redux/*" ') +
              "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined."
          );
      });
    }
    function Hb(e) {
      for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
        var a = t[n];
        typeof e[a] == "function" && (r[a] = e[a]);
      }
      var i = Object.keys(r);
      if (!1) var o;
      var s;
      try {
        jb(r);
      } catch (c) {
        s = c;
      }
      return function () {
        var d =
            arguments.length <= 0 || arguments[0] === void 0
              ? {}
              : arguments[0],
          v = arguments[1];
        if (s) throw s;
        if (!1) var p;
        for (var h = !1, I = {}, m = 0; m < i.length; m++) {
          var T = i[m],
            L = r[T],
            C = d[T],
            N = L(C, v);
          if (typeof N > "u") {
            var A = Bb(T, v);
            throw new Error(A);
          }
          (I[T] = N), (h = h || N !== C);
        }
        return h ? I : d;
      };
    }
  });
  var df = u((ka) => {
    "use strict";
    ka.__esModule = !0;
    ka.default = kb;
    function ff(e, t) {
      return function () {
        return t(e.apply(void 0, arguments));
      };
    }
    function kb(e, t) {
      if (typeof e == "function") return ff(e, t);
      if (typeof e != "object" || e === null)
        throw new Error(
          "bindActionCreators expected an object or a function, instead received " +
            (e === null ? "null" : typeof e) +
            '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
        );
      for (var r = Object.keys(e), n = {}, a = 0; a < r.length; a++) {
        var i = r[a],
          o = e[i];
        typeof o == "function" && (n[i] = ff(o, t));
      }
      return n;
    }
  });
  var za = u((Ka) => {
    "use strict";
    Ka.__esModule = !0;
    Ka.default = Kb;
    function Kb() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      if (t.length === 0)
        return function (i) {
          return i;
        };
      if (t.length === 1) return t[0];
      var n = t[t.length - 1],
        a = t.slice(0, -1);
      return function () {
        return a.reduceRight(function (i, o) {
          return o(i);
        }, n.apply(void 0, arguments));
      };
    }
  });
  var pf = u((Ya) => {
    "use strict";
    Ya.__esModule = !0;
    var zb =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      };
    Ya.default = Zb;
    var Yb = za(),
      $b = Qb(Yb);
    function Qb(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function Zb() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      return function (n) {
        return function (a, i, o) {
          var s = n(a, i, o),
            c = s.dispatch,
            d = [],
            v = {
              getState: s.getState,
              dispatch: function (h) {
                return c(h);
              },
            };
          return (
            (d = t.map(function (p) {
              return p(v);
            })),
            (c = $b.default.apply(void 0, d)(s.dispatch)),
            zb({}, s, { dispatch: c })
          );
        };
      };
    }
  });
  var $a = u((je) => {
    "use strict";
    je.__esModule = !0;
    je.compose =
      je.applyMiddleware =
      je.bindActionCreators =
      je.combineReducers =
      je.createStore =
        void 0;
    var Jb = Wa(),
      eS = er(Jb),
      tS = lf(),
      rS = er(tS),
      nS = df(),
      iS = er(nS),
      aS = pf(),
      oS = er(aS),
      sS = za(),
      uS = er(sS),
      cS = ja(),
      C5 = er(cS);
    function er(e) {
      return e && e.__esModule ? e : { default: e };
    }
    je.createStore = eS.default;
    je.combineReducers = rS.default;
    je.bindActionCreators = iS.default;
    je.applyMiddleware = oS.default;
    je.compose = uS.default;
  });
  var vf = u((we) => {
    "use strict";
    Object.defineProperty(we, "__esModule", { value: !0 });
    we.QuickEffectIds =
      we.QuickEffectDirectionConsts =
      we.EventTypeConsts =
      we.EventLimitAffectedElements =
      we.EventContinuousMouseAxes =
      we.EventBasedOn =
      we.EventAppliesTo =
        void 0;
    var lS = {
      NAVBAR_OPEN: "NAVBAR_OPEN",
      NAVBAR_CLOSE: "NAVBAR_CLOSE",
      TAB_ACTIVE: "TAB_ACTIVE",
      TAB_INACTIVE: "TAB_INACTIVE",
      SLIDER_ACTIVE: "SLIDER_ACTIVE",
      SLIDER_INACTIVE: "SLIDER_INACTIVE",
      DROPDOWN_OPEN: "DROPDOWN_OPEN",
      DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
      MOUSE_CLICK: "MOUSE_CLICK",
      MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
      MOUSE_DOWN: "MOUSE_DOWN",
      MOUSE_UP: "MOUSE_UP",
      MOUSE_OVER: "MOUSE_OVER",
      MOUSE_OUT: "MOUSE_OUT",
      MOUSE_MOVE: "MOUSE_MOVE",
      MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
      SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
      SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
      SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
      ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
      ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
      PAGE_START: "PAGE_START",
      PAGE_FINISH: "PAGE_FINISH",
      PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
      PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
      PAGE_SCROLL: "PAGE_SCROLL",
    };
    we.EventTypeConsts = lS;
    var fS = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" };
    we.EventAppliesTo = fS;
    var dS = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" };
    we.EventBasedOn = dS;
    var pS = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" };
    we.EventContinuousMouseAxes = pS;
    var vS = {
      CHILDREN: "CHILDREN",
      SIBLINGS: "SIBLINGS",
      IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
    };
    we.EventLimitAffectedElements = vS;
    var hS = {
      FADE_EFFECT: "FADE_EFFECT",
      SLIDE_EFFECT: "SLIDE_EFFECT",
      GROW_EFFECT: "GROW_EFFECT",
      SHRINK_EFFECT: "SHRINK_EFFECT",
      SPIN_EFFECT: "SPIN_EFFECT",
      FLY_EFFECT: "FLY_EFFECT",
      POP_EFFECT: "POP_EFFECT",
      FLIP_EFFECT: "FLIP_EFFECT",
      JIGGLE_EFFECT: "JIGGLE_EFFECT",
      PULSE_EFFECT: "PULSE_EFFECT",
      DROP_EFFECT: "DROP_EFFECT",
      BLINK_EFFECT: "BLINK_EFFECT",
      BOUNCE_EFFECT: "BOUNCE_EFFECT",
      FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
      FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
      RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
      JELLO_EFFECT: "JELLO_EFFECT",
      GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
      SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
      PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
    };
    we.QuickEffectIds = hS;
    var ES = {
      LEFT: "LEFT",
      RIGHT: "RIGHT",
      BOTTOM: "BOTTOM",
      TOP: "TOP",
      BOTTOM_LEFT: "BOTTOM_LEFT",
      BOTTOM_RIGHT: "BOTTOM_RIGHT",
      TOP_RIGHT: "TOP_RIGHT",
      TOP_LEFT: "TOP_LEFT",
      CLOCKWISE: "CLOCKWISE",
      COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
    };
    we.QuickEffectDirectionConsts = ES;
  });
  var Qa = u((tr) => {
    "use strict";
    Object.defineProperty(tr, "__esModule", { value: !0 });
    tr.ActionTypeConsts = tr.ActionAppliesTo = void 0;
    var gS = {
      TRANSFORM_MOVE: "TRANSFORM_MOVE",
      TRANSFORM_SCALE: "TRANSFORM_SCALE",
      TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
      TRANSFORM_SKEW: "TRANSFORM_SKEW",
      STYLE_OPACITY: "STYLE_OPACITY",
      STYLE_SIZE: "STYLE_SIZE",
      STYLE_FILTER: "STYLE_FILTER",
      STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
      STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
      STYLE_BORDER: "STYLE_BORDER",
      STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
      OBJECT_VALUE: "OBJECT_VALUE",
      PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
      PLUGIN_SPLINE: "PLUGIN_SPLINE",
      PLUGIN_VARIABLE: "PLUGIN_VARIABLE",
      GENERAL_DISPLAY: "GENERAL_DISPLAY",
      GENERAL_START_ACTION: "GENERAL_START_ACTION",
      GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
      GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
      GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
      GENERAL_LOOP: "GENERAL_LOOP",
      STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
    };
    tr.ActionTypeConsts = gS;
    var _S = {
      ELEMENT: "ELEMENT",
      ELEMENT_CLASS: "ELEMENT_CLASS",
      TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
    };
    tr.ActionAppliesTo = _S;
  });
  var hf = u((Sn) => {
    "use strict";
    Object.defineProperty(Sn, "__esModule", { value: !0 });
    Sn.InteractionTypeConsts = void 0;
    var yS = {
      MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
      MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
      MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
      SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
      SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
      MOUSE_MOVE_IN_VIEWPORT_INTERACTION: "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
      PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
      PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
      PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
      NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
      DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
      ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
      TAB_INTERACTION: "TAB_INTERACTION",
      SLIDER_INTERACTION: "SLIDER_INTERACTION",
    };
    Sn.InteractionTypeConsts = yS;
  });
  var Ef = u((An) => {
    "use strict";
    Object.defineProperty(An, "__esModule", { value: !0 });
    An.ReducedMotionTypes = void 0;
    var IS = Qa(),
      {
        TRANSFORM_MOVE: mS,
        TRANSFORM_SCALE: TS,
        TRANSFORM_ROTATE: OS,
        TRANSFORM_SKEW: bS,
        STYLE_SIZE: SS,
        STYLE_FILTER: AS,
        STYLE_FONT_VARIATION: wS,
      } = IS.ActionTypeConsts,
      RS = {
        [mS]: !0,
        [TS]: !0,
        [OS]: !0,
        [bS]: !0,
        [SS]: !0,
        [AS]: !0,
        [wS]: !0,
      };
    An.ReducedMotionTypes = RS;
  });
  var gf = u((ne) => {
    "use strict";
    Object.defineProperty(ne, "__esModule", { value: !0 });
    ne.IX2_VIEWPORT_WIDTH_CHANGED =
      ne.IX2_TEST_FRAME_RENDERED =
      ne.IX2_STOP_REQUESTED =
      ne.IX2_SESSION_STOPPED =
      ne.IX2_SESSION_STARTED =
      ne.IX2_SESSION_INITIALIZED =
      ne.IX2_RAW_DATA_IMPORTED =
      ne.IX2_PREVIEW_REQUESTED =
      ne.IX2_PLAYBACK_REQUESTED =
      ne.IX2_PARAMETER_CHANGED =
      ne.IX2_MEDIA_QUERIES_DEFINED =
      ne.IX2_INSTANCE_STARTED =
      ne.IX2_INSTANCE_REMOVED =
      ne.IX2_INSTANCE_ADDED =
      ne.IX2_EVENT_STATE_CHANGED =
      ne.IX2_EVENT_LISTENER_ADDED =
      ne.IX2_ELEMENT_STATE_CHANGED =
      ne.IX2_CLEAR_REQUESTED =
      ne.IX2_ANIMATION_FRAME_CHANGED =
      ne.IX2_ACTION_LIST_PLAYBACK_CHANGED =
        void 0;
    var CS = "IX2_RAW_DATA_IMPORTED";
    ne.IX2_RAW_DATA_IMPORTED = CS;
    var NS = "IX2_SESSION_INITIALIZED";
    ne.IX2_SESSION_INITIALIZED = NS;
    var PS = "IX2_SESSION_STARTED";
    ne.IX2_SESSION_STARTED = PS;
    var qS = "IX2_SESSION_STOPPED";
    ne.IX2_SESSION_STOPPED = qS;
    var xS = "IX2_PREVIEW_REQUESTED";
    ne.IX2_PREVIEW_REQUESTED = xS;
    var LS = "IX2_PLAYBACK_REQUESTED";
    ne.IX2_PLAYBACK_REQUESTED = LS;
    var MS = "IX2_STOP_REQUESTED";
    ne.IX2_STOP_REQUESTED = MS;
    var DS = "IX2_CLEAR_REQUESTED";
    ne.IX2_CLEAR_REQUESTED = DS;
    var FS = "IX2_EVENT_LISTENER_ADDED";
    ne.IX2_EVENT_LISTENER_ADDED = FS;
    var GS = "IX2_EVENT_STATE_CHANGED";
    ne.IX2_EVENT_STATE_CHANGED = GS;
    var XS = "IX2_ANIMATION_FRAME_CHANGED";
    ne.IX2_ANIMATION_FRAME_CHANGED = XS;
    var US = "IX2_PARAMETER_CHANGED";
    ne.IX2_PARAMETER_CHANGED = US;
    var VS = "IX2_INSTANCE_ADDED";
    ne.IX2_INSTANCE_ADDED = VS;
    var WS = "IX2_INSTANCE_STARTED";
    ne.IX2_INSTANCE_STARTED = WS;
    var BS = "IX2_INSTANCE_REMOVED";
    ne.IX2_INSTANCE_REMOVED = BS;
    var jS = "IX2_ELEMENT_STATE_CHANGED";
    ne.IX2_ELEMENT_STATE_CHANGED = jS;
    var HS = "IX2_ACTION_LIST_PLAYBACK_CHANGED";
    ne.IX2_ACTION_LIST_PLAYBACK_CHANGED = HS;
    var kS = "IX2_VIEWPORT_WIDTH_CHANGED";
    ne.IX2_VIEWPORT_WIDTH_CHANGED = kS;
    var KS = "IX2_MEDIA_QUERIES_DEFINED";
    ne.IX2_MEDIA_QUERIES_DEFINED = KS;
    var zS = "IX2_TEST_FRAME_RENDERED";
    ne.IX2_TEST_FRAME_RENDERED = zS;
  });
  var _f = u((P) => {
    "use strict";
    Object.defineProperty(P, "__esModule", { value: !0 });
    P.W_MOD_JS =
      P.W_MOD_IX =
      P.WILL_CHANGE =
      P.WIDTH =
      P.WF_PAGE =
      P.TRANSLATE_Z =
      P.TRANSLATE_Y =
      P.TRANSLATE_X =
      P.TRANSLATE_3D =
      P.TRANSFORM =
      P.SKEW_Y =
      P.SKEW_X =
      P.SKEW =
      P.SIBLINGS =
      P.SCALE_Z =
      P.SCALE_Y =
      P.SCALE_X =
      P.SCALE_3D =
      P.ROTATE_Z =
      P.ROTATE_Y =
      P.ROTATE_X =
      P.RENDER_TRANSFORM =
      P.RENDER_STYLE =
      P.RENDER_PLUGIN =
      P.RENDER_GENERAL =
      P.PRESERVE_3D =
      P.PLAIN_OBJECT =
      P.PARENT =
      P.OPACITY =
      P.IX2_ID_DELIMITER =
      P.IMMEDIATE_CHILDREN =
      P.HTML_ELEMENT =
      P.HEIGHT =
      P.FONT_VARIATION_SETTINGS =
      P.FLEX =
      P.FILTER =
      P.DISPLAY =
      P.CONFIG_Z_VALUE =
      P.CONFIG_Z_UNIT =
      P.CONFIG_Y_VALUE =
      P.CONFIG_Y_UNIT =
      P.CONFIG_X_VALUE =
      P.CONFIG_X_UNIT =
      P.CONFIG_VALUE =
      P.CONFIG_UNIT =
      P.COMMA_DELIMITER =
      P.COLOR =
      P.COLON_DELIMITER =
      P.CHILDREN =
      P.BOUNDARY_SELECTOR =
      P.BORDER_COLOR =
      P.BAR_DELIMITER =
      P.BACKGROUND_COLOR =
      P.BACKGROUND =
      P.AUTO =
      P.ABSTRACT_NODE =
        void 0;
    var YS = "|";
    P.IX2_ID_DELIMITER = YS;
    var $S = "data-wf-page";
    P.WF_PAGE = $S;
    var QS = "w-mod-js";
    P.W_MOD_JS = QS;
    var ZS = "w-mod-ix";
    P.W_MOD_IX = ZS;
    var JS = ".w-dyn-item";
    P.BOUNDARY_SELECTOR = JS;
    var e0 = "xValue";
    P.CONFIG_X_VALUE = e0;
    var t0 = "yValue";
    P.CONFIG_Y_VALUE = t0;
    var r0 = "zValue";
    P.CONFIG_Z_VALUE = r0;
    var n0 = "value";
    P.CONFIG_VALUE = n0;
    var i0 = "xUnit";
    P.CONFIG_X_UNIT = i0;
    var a0 = "yUnit";
    P.CONFIG_Y_UNIT = a0;
    var o0 = "zUnit";
    P.CONFIG_Z_UNIT = o0;
    var s0 = "unit";
    P.CONFIG_UNIT = s0;
    var u0 = "transform";
    P.TRANSFORM = u0;
    var c0 = "translateX";
    P.TRANSLATE_X = c0;
    var l0 = "translateY";
    P.TRANSLATE_Y = l0;
    var f0 = "translateZ";
    P.TRANSLATE_Z = f0;
    var d0 = "translate3d";
    P.TRANSLATE_3D = d0;
    var p0 = "scaleX";
    P.SCALE_X = p0;
    var v0 = "scaleY";
    P.SCALE_Y = v0;
    var h0 = "scaleZ";
    P.SCALE_Z = h0;
    var E0 = "scale3d";
    P.SCALE_3D = E0;
    var g0 = "rotateX";
    P.ROTATE_X = g0;
    var _0 = "rotateY";
    P.ROTATE_Y = _0;
    var y0 = "rotateZ";
    P.ROTATE_Z = y0;
    var I0 = "skew";
    P.SKEW = I0;
    var m0 = "skewX";
    P.SKEW_X = m0;
    var T0 = "skewY";
    P.SKEW_Y = T0;
    var O0 = "opacity";
    P.OPACITY = O0;
    var b0 = "filter";
    P.FILTER = b0;
    var S0 = "font-variation-settings";
    P.FONT_VARIATION_SETTINGS = S0;
    var A0 = "width";
    P.WIDTH = A0;
    var w0 = "height";
    P.HEIGHT = w0;
    var R0 = "backgroundColor";
    P.BACKGROUND_COLOR = R0;
    var C0 = "background";
    P.BACKGROUND = C0;
    var N0 = "borderColor";
    P.BORDER_COLOR = N0;
    var P0 = "color";
    P.COLOR = P0;
    var q0 = "display";
    P.DISPLAY = q0;
    var x0 = "flex";
    P.FLEX = x0;
    var L0 = "willChange";
    P.WILL_CHANGE = L0;
    var M0 = "AUTO";
    P.AUTO = M0;
    var D0 = ",";
    P.COMMA_DELIMITER = D0;
    var F0 = ":";
    P.COLON_DELIMITER = F0;
    var G0 = "|";
    P.BAR_DELIMITER = G0;
    var X0 = "CHILDREN";
    P.CHILDREN = X0;
    var U0 = "IMMEDIATE_CHILDREN";
    P.IMMEDIATE_CHILDREN = U0;
    var V0 = "SIBLINGS";
    P.SIBLINGS = V0;
    var W0 = "PARENT";
    P.PARENT = W0;
    var B0 = "preserve-3d";
    P.PRESERVE_3D = B0;
    var j0 = "HTML_ELEMENT";
    P.HTML_ELEMENT = j0;
    var H0 = "PLAIN_OBJECT";
    P.PLAIN_OBJECT = H0;
    var k0 = "ABSTRACT_NODE";
    P.ABSTRACT_NODE = k0;
    var K0 = "RENDER_TRANSFORM";
    P.RENDER_TRANSFORM = K0;
    var z0 = "RENDER_GENERAL";
    P.RENDER_GENERAL = z0;
    var Y0 = "RENDER_STYLE";
    P.RENDER_STYLE = Y0;
    var $0 = "RENDER_PLUGIN";
    P.RENDER_PLUGIN = $0;
  });
  var Xe = u((Te) => {
    "use strict";
    var yf = Lt().default;
    Object.defineProperty(Te, "__esModule", { value: !0 });
    var wn = { IX2EngineActionTypes: !0, IX2EngineConstants: !0 };
    Te.IX2EngineConstants = Te.IX2EngineActionTypes = void 0;
    var Za = vf();
    Object.keys(Za).forEach(function (e) {
      e === "default" ||
        e === "__esModule" ||
        Object.prototype.hasOwnProperty.call(wn, e) ||
        (e in Te && Te[e] === Za[e]) ||
        Object.defineProperty(Te, e, {
          enumerable: !0,
          get: function () {
            return Za[e];
          },
        });
    });
    var Ja = Qa();
    Object.keys(Ja).forEach(function (e) {
      e === "default" ||
        e === "__esModule" ||
        Object.prototype.hasOwnProperty.call(wn, e) ||
        (e in Te && Te[e] === Ja[e]) ||
        Object.defineProperty(Te, e, {
          enumerable: !0,
          get: function () {
            return Ja[e];
          },
        });
    });
    var eo = hf();
    Object.keys(eo).forEach(function (e) {
      e === "default" ||
        e === "__esModule" ||
        Object.prototype.hasOwnProperty.call(wn, e) ||
        (e in Te && Te[e] === eo[e]) ||
        Object.defineProperty(Te, e, {
          enumerable: !0,
          get: function () {
            return eo[e];
          },
        });
    });
    var to = Ef();
    Object.keys(to).forEach(function (e) {
      e === "default" ||
        e === "__esModule" ||
        Object.prototype.hasOwnProperty.call(wn, e) ||
        (e in Te && Te[e] === to[e]) ||
        Object.defineProperty(Te, e, {
          enumerable: !0,
          get: function () {
            return to[e];
          },
        });
    });
    var Q0 = yf(gf());
    Te.IX2EngineActionTypes = Q0;
    var Z0 = yf(_f());
    Te.IX2EngineConstants = Z0;
  });
  var If = u((Rn) => {
    "use strict";
    Object.defineProperty(Rn, "__esModule", { value: !0 });
    Rn.ixData = void 0;
    var J0 = Xe(),
      { IX2_RAW_DATA_IMPORTED: eA } = J0.IX2EngineActionTypes,
      tA = (e = Object.freeze({}), t) => {
        switch (t.type) {
          case eA:
            return t.payload.ixData || Object.freeze({});
          default:
            return e;
        }
      };
    Rn.ixData = tA;
  });
  var rr = u((X5, yt) => {
    function ro() {
      return (
        (yt.exports = ro =
          Object.assign
            ? Object.assign.bind()
            : function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var r = arguments[t];
                  for (var n in r)
                    Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
                }
                return e;
              }),
        (yt.exports.__esModule = !0),
        (yt.exports.default = yt.exports),
        ro.apply(this, arguments)
      );
    }
    (yt.exports = ro),
      (yt.exports.__esModule = !0),
      (yt.exports.default = yt.exports);
  });
  var nr = u((_e) => {
    "use strict";
    Object.defineProperty(_e, "__esModule", { value: !0 });
    var rA =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == "function" &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          };
    _e.clone = Nn;
    _e.addLast = Of;
    _e.addFirst = bf;
    _e.removeLast = Sf;
    _e.removeFirst = Af;
    _e.insert = wf;
    _e.removeAt = Rf;
    _e.replaceAt = Cf;
    _e.getIn = Pn;
    _e.set = qn;
    _e.setIn = xn;
    _e.update = Pf;
    _e.updateIn = qf;
    _e.merge = xf;
    _e.mergeDeep = Lf;
    _e.mergeIn = Mf;
    _e.omit = Df;
    _e.addDefaults = Ff;
    var mf = "INVALID_ARGS";
    function Tf(e) {
      throw new Error(e);
    }
    function no(e) {
      var t = Object.keys(e);
      return Object.getOwnPropertySymbols
        ? t.concat(Object.getOwnPropertySymbols(e))
        : t;
    }
    var nA = {}.hasOwnProperty;
    function Nn(e) {
      if (Array.isArray(e)) return e.slice();
      for (var t = no(e), r = {}, n = 0; n < t.length; n++) {
        var a = t[n];
        r[a] = e[a];
      }
      return r;
    }
    function Ue(e, t, r) {
      var n = r;
      n == null && Tf(mf);
      for (
        var a = !1, i = arguments.length, o = Array(i > 3 ? i - 3 : 0), s = 3;
        s < i;
        s++
      )
        o[s - 3] = arguments[s];
      for (var c = 0; c < o.length; c++) {
        var d = o[c];
        if (d != null) {
          var v = no(d);
          if (v.length)
            for (var p = 0; p <= v.length; p++) {
              var h = v[p];
              if (!(e && n[h] !== void 0)) {
                var I = d[h];
                t && Cn(n[h]) && Cn(I) && (I = Ue(e, t, n[h], I)),
                  !(I === void 0 || I === n[h]) &&
                    (a || ((a = !0), (n = Nn(n))), (n[h] = I));
              }
            }
        }
      }
      return n;
    }
    function Cn(e) {
      var t = typeof e > "u" ? "undefined" : rA(e);
      return e != null && (t === "object" || t === "function");
    }
    function Of(e, t) {
      return Array.isArray(t) ? e.concat(t) : e.concat([t]);
    }
    function bf(e, t) {
      return Array.isArray(t) ? t.concat(e) : [t].concat(e);
    }
    function Sf(e) {
      return e.length ? e.slice(0, e.length - 1) : e;
    }
    function Af(e) {
      return e.length ? e.slice(1) : e;
    }
    function wf(e, t, r) {
      return e
        .slice(0, t)
        .concat(Array.isArray(r) ? r : [r])
        .concat(e.slice(t));
    }
    function Rf(e, t) {
      return t >= e.length || t < 0 ? e : e.slice(0, t).concat(e.slice(t + 1));
    }
    function Cf(e, t, r) {
      if (e[t] === r) return e;
      for (var n = e.length, a = Array(n), i = 0; i < n; i++) a[i] = e[i];
      return (a[t] = r), a;
    }
    function Pn(e, t) {
      if ((!Array.isArray(t) && Tf(mf), e != null)) {
        for (var r = e, n = 0; n < t.length; n++) {
          var a = t[n];
          if (((r = r?.[a]), r === void 0)) return r;
        }
        return r;
      }
    }
    function qn(e, t, r) {
      var n = typeof t == "number" ? [] : {},
        a = e ?? n;
      if (a[t] === r) return a;
      var i = Nn(a);
      return (i[t] = r), i;
    }
    function Nf(e, t, r, n) {
      var a = void 0,
        i = t[n];
      if (n === t.length - 1) a = r;
      else {
        var o =
          Cn(e) && Cn(e[i]) ? e[i] : typeof t[n + 1] == "number" ? [] : {};
        a = Nf(o, t, r, n + 1);
      }
      return qn(e, i, a);
    }
    function xn(e, t, r) {
      return t.length ? Nf(e, t, r, 0) : r;
    }
    function Pf(e, t, r) {
      var n = e?.[t],
        a = r(n);
      return qn(e, t, a);
    }
    function qf(e, t, r) {
      var n = Pn(e, t),
        a = r(n);
      return xn(e, t, a);
    }
    function xf(e, t, r, n, a, i) {
      for (
        var o = arguments.length, s = Array(o > 6 ? o - 6 : 0), c = 6;
        c < o;
        c++
      )
        s[c - 6] = arguments[c];
      return s.length
        ? Ue.call.apply(Ue, [null, !1, !1, e, t, r, n, a, i].concat(s))
        : Ue(!1, !1, e, t, r, n, a, i);
    }
    function Lf(e, t, r, n, a, i) {
      for (
        var o = arguments.length, s = Array(o > 6 ? o - 6 : 0), c = 6;
        c < o;
        c++
      )
        s[c - 6] = arguments[c];
      return s.length
        ? Ue.call.apply(Ue, [null, !1, !0, e, t, r, n, a, i].concat(s))
        : Ue(!1, !0, e, t, r, n, a, i);
    }
    function Mf(e, t, r, n, a, i, o) {
      var s = Pn(e, t);
      s == null && (s = {});
      for (
        var c = void 0,
          d = arguments.length,
          v = Array(d > 7 ? d - 7 : 0),
          p = 7;
        p < d;
        p++
      )
        v[p - 7] = arguments[p];
      return (
        v.length
          ? (c = Ue.call.apply(Ue, [null, !1, !1, s, r, n, a, i, o].concat(v)))
          : (c = Ue(!1, !1, s, r, n, a, i, o)),
        xn(e, t, c)
      );
    }
    function Df(e, t) {
      for (var r = Array.isArray(t) ? t : [t], n = !1, a = 0; a < r.length; a++)
        if (nA.call(e, r[a])) {
          n = !0;
          break;
        }
      if (!n) return e;
      for (var i = {}, o = no(e), s = 0; s < o.length; s++) {
        var c = o[s];
        r.indexOf(c) >= 0 || (i[c] = e[c]);
      }
      return i;
    }
    function Ff(e, t, r, n, a, i) {
      for (
        var o = arguments.length, s = Array(o > 6 ? o - 6 : 0), c = 6;
        c < o;
        c++
      )
        s[c - 6] = arguments[c];
      return s.length
        ? Ue.call.apply(Ue, [null, !0, !1, e, t, r, n, a, i].concat(s))
        : Ue(!0, !1, e, t, r, n, a, i);
    }
    var iA = {
      clone: Nn,
      addLast: Of,
      addFirst: bf,
      removeLast: Sf,
      removeFirst: Af,
      insert: wf,
      removeAt: Rf,
      replaceAt: Cf,
      getIn: Pn,
      set: qn,
      setIn: xn,
      update: Pf,
      updateIn: qf,
      merge: xf,
      mergeDeep: Lf,
      mergeIn: Mf,
      omit: Df,
      addDefaults: Ff,
    };
    _e.default = iA;
  });
  var Xf = u((Ln) => {
    "use strict";
    var aA = Qe().default;
    Object.defineProperty(Ln, "__esModule", { value: !0 });
    Ln.ixRequest = void 0;
    var oA = aA(rr()),
      sA = Xe(),
      uA = nr(),
      {
        IX2_PREVIEW_REQUESTED: cA,
        IX2_PLAYBACK_REQUESTED: lA,
        IX2_STOP_REQUESTED: fA,
        IX2_CLEAR_REQUESTED: dA,
      } = sA.IX2EngineActionTypes,
      pA = { preview: {}, playback: {}, stop: {}, clear: {} },
      Gf = Object.create(null, {
        [cA]: { value: "preview" },
        [lA]: { value: "playback" },
        [fA]: { value: "stop" },
        [dA]: { value: "clear" },
      }),
      vA = (e = pA, t) => {
        if (t.type in Gf) {
          let r = [Gf[t.type]];
          return (0, uA.setIn)(e, [r], (0, oA.default)({}, t.payload));
        }
        return e;
      };
    Ln.ixRequest = vA;
  });
  var Vf = u((Mn) => {
    "use strict";
    Object.defineProperty(Mn, "__esModule", { value: !0 });
    Mn.ixSession = void 0;
    var hA = Xe(),
      ct = nr(),
      {
        IX2_SESSION_INITIALIZED: EA,
        IX2_SESSION_STARTED: gA,
        IX2_TEST_FRAME_RENDERED: _A,
        IX2_SESSION_STOPPED: yA,
        IX2_EVENT_LISTENER_ADDED: IA,
        IX2_EVENT_STATE_CHANGED: mA,
        IX2_ANIMATION_FRAME_CHANGED: TA,
        IX2_ACTION_LIST_PLAYBACK_CHANGED: OA,
        IX2_VIEWPORT_WIDTH_CHANGED: bA,
        IX2_MEDIA_QUERIES_DEFINED: SA,
      } = hA.IX2EngineActionTypes,
      Uf = {
        active: !1,
        tick: 0,
        eventListeners: [],
        eventState: {},
        playbackState: {},
        viewportWidth: 0,
        mediaQueryKey: null,
        hasBoundaryNodes: !1,
        hasDefinedMediaQueries: !1,
        reducedMotion: !1,
      },
      AA = 20,
      wA = (e = Uf, t) => {
        switch (t.type) {
          case EA: {
            let { hasBoundaryNodes: r, reducedMotion: n } = t.payload;
            return (0, ct.merge)(e, { hasBoundaryNodes: r, reducedMotion: n });
          }
          case gA:
            return (0, ct.set)(e, "active", !0);
          case _A: {
            let {
              payload: { step: r = AA },
            } = t;
            return (0, ct.set)(e, "tick", e.tick + r);
          }
          case yA:
            return Uf;
          case TA: {
            let {
              payload: { now: r },
            } = t;
            return (0, ct.set)(e, "tick", r);
          }
          case IA: {
            let r = (0, ct.addLast)(e.eventListeners, t.payload);
            return (0, ct.set)(e, "eventListeners", r);
          }
          case mA: {
            let { stateKey: r, newState: n } = t.payload;
            return (0, ct.setIn)(e, ["eventState", r], n);
          }
          case OA: {
            let { actionListId: r, isPlaying: n } = t.payload;
            return (0, ct.setIn)(e, ["playbackState", r], n);
          }
          case bA: {
            let { width: r, mediaQueries: n } = t.payload,
              a = n.length,
              i = null;
            for (let o = 0; o < a; o++) {
              let { key: s, min: c, max: d } = n[o];
              if (r >= c && r <= d) {
                i = s;
                break;
              }
            }
            return (0, ct.merge)(e, { viewportWidth: r, mediaQueryKey: i });
          }
          case SA:
            return (0, ct.set)(e, "hasDefinedMediaQueries", !0);
          default:
            return e;
        }
      };
    Mn.ixSession = wA;
  });
  var Bf = u((B5, Wf) => {
    function RA() {
      (this.__data__ = []), (this.size = 0);
    }
    Wf.exports = RA;
  });
  var Dn = u((j5, jf) => {
    function CA(e, t) {
      return e === t || (e !== e && t !== t);
    }
    jf.exports = CA;
  });
  var Dr = u((H5, Hf) => {
    var NA = Dn();
    function PA(e, t) {
      for (var r = e.length; r--; ) if (NA(e[r][0], t)) return r;
      return -1;
    }
    Hf.exports = PA;
  });
  var Kf = u((k5, kf) => {
    var qA = Dr(),
      xA = Array.prototype,
      LA = xA.splice;
    function MA(e) {
      var t = this.__data__,
        r = qA(t, e);
      if (r < 0) return !1;
      var n = t.length - 1;
      return r == n ? t.pop() : LA.call(t, r, 1), --this.size, !0;
    }
    kf.exports = MA;
  });
  var Yf = u((K5, zf) => {
    var DA = Dr();
    function FA(e) {
      var t = this.__data__,
        r = DA(t, e);
      return r < 0 ? void 0 : t[r][1];
    }
    zf.exports = FA;
  });
  var Qf = u((z5, $f) => {
    var GA = Dr();
    function XA(e) {
      return GA(this.__data__, e) > -1;
    }
    $f.exports = XA;
  });
  var Jf = u((Y5, Zf) => {
    var UA = Dr();
    function VA(e, t) {
      var r = this.__data__,
        n = UA(r, e);
      return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
    }
    Zf.exports = VA;
  });
  var Fr = u(($5, ed) => {
    var WA = Bf(),
      BA = Kf(),
      jA = Yf(),
      HA = Qf(),
      kA = Jf();
    function ir(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    ir.prototype.clear = WA;
    ir.prototype.delete = BA;
    ir.prototype.get = jA;
    ir.prototype.has = HA;
    ir.prototype.set = kA;
    ed.exports = ir;
  });
  var rd = u((Q5, td) => {
    var KA = Fr();
    function zA() {
      (this.__data__ = new KA()), (this.size = 0);
    }
    td.exports = zA;
  });
  var id = u((Z5, nd) => {
    function YA(e) {
      var t = this.__data__,
        r = t.delete(e);
      return (this.size = t.size), r;
    }
    nd.exports = YA;
  });
  var od = u((J5, ad) => {
    function $A(e) {
      return this.__data__.get(e);
    }
    ad.exports = $A;
  });
  var ud = u((ej, sd) => {
    function QA(e) {
      return this.__data__.has(e);
    }
    sd.exports = QA;
  });
  var lt = u((tj, cd) => {
    function ZA(e) {
      var t = typeof e;
      return e != null && (t == "object" || t == "function");
    }
    cd.exports = ZA;
  });
  var io = u((rj, ld) => {
    var JA = St(),
      ew = lt(),
      tw = "[object AsyncFunction]",
      rw = "[object Function]",
      nw = "[object GeneratorFunction]",
      iw = "[object Proxy]";
    function aw(e) {
      if (!ew(e)) return !1;
      var t = JA(e);
      return t == rw || t == nw || t == tw || t == iw;
    }
    ld.exports = aw;
  });
  var dd = u((nj, fd) => {
    var ow = et(),
      sw = ow["__core-js_shared__"];
    fd.exports = sw;
  });
  var hd = u((ij, vd) => {
    var ao = dd(),
      pd = (function () {
        var e = /[^.]+$/.exec((ao && ao.keys && ao.keys.IE_PROTO) || "");
        return e ? "Symbol(src)_1." + e : "";
      })();
    function uw(e) {
      return !!pd && pd in e;
    }
    vd.exports = uw;
  });
  var oo = u((aj, Ed) => {
    var cw = Function.prototype,
      lw = cw.toString;
    function fw(e) {
      if (e != null) {
        try {
          return lw.call(e);
        } catch {}
        try {
          return e + "";
        } catch {}
      }
      return "";
    }
    Ed.exports = fw;
  });
  var _d = u((oj, gd) => {
    var dw = io(),
      pw = hd(),
      vw = lt(),
      hw = oo(),
      Ew = /[\\^$.*+?()[\]{}|]/g,
      gw = /^\[object .+?Constructor\]$/,
      _w = Function.prototype,
      yw = Object.prototype,
      Iw = _w.toString,
      mw = yw.hasOwnProperty,
      Tw = RegExp(
        "^" +
          Iw.call(mw)
            .replace(Ew, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?"
            ) +
          "$"
      );
    function Ow(e) {
      if (!vw(e) || pw(e)) return !1;
      var t = dw(e) ? Tw : gw;
      return t.test(hw(e));
    }
    gd.exports = Ow;
  });
  var Id = u((sj, yd) => {
    function bw(e, t) {
      return e?.[t];
    }
    yd.exports = bw;
  });
  var At = u((uj, md) => {
    var Sw = _d(),
      Aw = Id();
    function ww(e, t) {
      var r = Aw(e, t);
      return Sw(r) ? r : void 0;
    }
    md.exports = ww;
  });
  var Fn = u((cj, Td) => {
    var Rw = At(),
      Cw = et(),
      Nw = Rw(Cw, "Map");
    Td.exports = Nw;
  });
  var Gr = u((lj, Od) => {
    var Pw = At(),
      qw = Pw(Object, "create");
    Od.exports = qw;
  });
  var Ad = u((fj, Sd) => {
    var bd = Gr();
    function xw() {
      (this.__data__ = bd ? bd(null) : {}), (this.size = 0);
    }
    Sd.exports = xw;
  });
  var Rd = u((dj, wd) => {
    function Lw(e) {
      var t = this.has(e) && delete this.__data__[e];
      return (this.size -= t ? 1 : 0), t;
    }
    wd.exports = Lw;
  });
  var Nd = u((pj, Cd) => {
    var Mw = Gr(),
      Dw = "__lodash_hash_undefined__",
      Fw = Object.prototype,
      Gw = Fw.hasOwnProperty;
    function Xw(e) {
      var t = this.__data__;
      if (Mw) {
        var r = t[e];
        return r === Dw ? void 0 : r;
      }
      return Gw.call(t, e) ? t[e] : void 0;
    }
    Cd.exports = Xw;
  });
  var qd = u((vj, Pd) => {
    var Uw = Gr(),
      Vw = Object.prototype,
      Ww = Vw.hasOwnProperty;
    function Bw(e) {
      var t = this.__data__;
      return Uw ? t[e] !== void 0 : Ww.call(t, e);
    }
    Pd.exports = Bw;
  });
  var Ld = u((hj, xd) => {
    var jw = Gr(),
      Hw = "__lodash_hash_undefined__";
    function kw(e, t) {
      var r = this.__data__;
      return (
        (this.size += this.has(e) ? 0 : 1),
        (r[e] = jw && t === void 0 ? Hw : t),
        this
      );
    }
    xd.exports = kw;
  });
  var Dd = u((Ej, Md) => {
    var Kw = Ad(),
      zw = Rd(),
      Yw = Nd(),
      $w = qd(),
      Qw = Ld();
    function ar(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    ar.prototype.clear = Kw;
    ar.prototype.delete = zw;
    ar.prototype.get = Yw;
    ar.prototype.has = $w;
    ar.prototype.set = Qw;
    Md.exports = ar;
  });
  var Xd = u((gj, Gd) => {
    var Fd = Dd(),
      Zw = Fr(),
      Jw = Fn();
    function eR() {
      (this.size = 0),
        (this.__data__ = {
          hash: new Fd(),
          map: new (Jw || Zw)(),
          string: new Fd(),
        });
    }
    Gd.exports = eR;
  });
  var Vd = u((_j, Ud) => {
    function tR(e) {
      var t = typeof e;
      return t == "string" || t == "number" || t == "symbol" || t == "boolean"
        ? e !== "__proto__"
        : e === null;
    }
    Ud.exports = tR;
  });
  var Xr = u((yj, Wd) => {
    var rR = Vd();
    function nR(e, t) {
      var r = e.__data__;
      return rR(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    Wd.exports = nR;
  });
  var jd = u((Ij, Bd) => {
    var iR = Xr();
    function aR(e) {
      var t = iR(this, e).delete(e);
      return (this.size -= t ? 1 : 0), t;
    }
    Bd.exports = aR;
  });
  var kd = u((mj, Hd) => {
    var oR = Xr();
    function sR(e) {
      return oR(this, e).get(e);
    }
    Hd.exports = sR;
  });
  var zd = u((Tj, Kd) => {
    var uR = Xr();
    function cR(e) {
      return uR(this, e).has(e);
    }
    Kd.exports = cR;
  });
  var $d = u((Oj, Yd) => {
    var lR = Xr();
    function fR(e, t) {
      var r = lR(this, e),
        n = r.size;
      return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
    }
    Yd.exports = fR;
  });
  var Gn = u((bj, Qd) => {
    var dR = Xd(),
      pR = jd(),
      vR = kd(),
      hR = zd(),
      ER = $d();
    function or(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    or.prototype.clear = dR;
    or.prototype.delete = pR;
    or.prototype.get = vR;
    or.prototype.has = hR;
    or.prototype.set = ER;
    Qd.exports = or;
  });
  var Jd = u((Sj, Zd) => {
    var gR = Fr(),
      _R = Fn(),
      yR = Gn(),
      IR = 200;
    function mR(e, t) {
      var r = this.__data__;
      if (r instanceof gR) {
        var n = r.__data__;
        if (!_R || n.length < IR - 1)
          return n.push([e, t]), (this.size = ++r.size), this;
        r = this.__data__ = new yR(n);
      }
      return r.set(e, t), (this.size = r.size), this;
    }
    Zd.exports = mR;
  });
  var so = u((Aj, ep) => {
    var TR = Fr(),
      OR = rd(),
      bR = id(),
      SR = od(),
      AR = ud(),
      wR = Jd();
    function sr(e) {
      var t = (this.__data__ = new TR(e));
      this.size = t.size;
    }
    sr.prototype.clear = OR;
    sr.prototype.delete = bR;
    sr.prototype.get = SR;
    sr.prototype.has = AR;
    sr.prototype.set = wR;
    ep.exports = sr;
  });
  var rp = u((wj, tp) => {
    var RR = "__lodash_hash_undefined__";
    function CR(e) {
      return this.__data__.set(e, RR), this;
    }
    tp.exports = CR;
  });
  var ip = u((Rj, np) => {
    function NR(e) {
      return this.__data__.has(e);
    }
    np.exports = NR;
  });
  var op = u((Cj, ap) => {
    var PR = Gn(),
      qR = rp(),
      xR = ip();
    function Xn(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.__data__ = new PR(); ++t < r; ) this.add(e[t]);
    }
    Xn.prototype.add = Xn.prototype.push = qR;
    Xn.prototype.has = xR;
    ap.exports = Xn;
  });
  var up = u((Nj, sp) => {
    function LR(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
        if (t(e[r], r, e)) return !0;
      return !1;
    }
    sp.exports = LR;
  });
  var lp = u((Pj, cp) => {
    function MR(e, t) {
      return e.has(t);
    }
    cp.exports = MR;
  });
  var uo = u((qj, fp) => {
    var DR = op(),
      FR = up(),
      GR = lp(),
      XR = 1,
      UR = 2;
    function VR(e, t, r, n, a, i) {
      var o = r & XR,
        s = e.length,
        c = t.length;
      if (s != c && !(o && c > s)) return !1;
      var d = i.get(e),
        v = i.get(t);
      if (d && v) return d == t && v == e;
      var p = -1,
        h = !0,
        I = r & UR ? new DR() : void 0;
      for (i.set(e, t), i.set(t, e); ++p < s; ) {
        var m = e[p],
          T = t[p];
        if (n) var L = o ? n(T, m, p, t, e, i) : n(m, T, p, e, t, i);
        if (L !== void 0) {
          if (L) continue;
          h = !1;
          break;
        }
        if (I) {
          if (
            !FR(t, function (C, N) {
              if (!GR(I, N) && (m === C || a(m, C, r, n, i))) return I.push(N);
            })
          ) {
            h = !1;
            break;
          }
        } else if (!(m === T || a(m, T, r, n, i))) {
          h = !1;
          break;
        }
      }
      return i.delete(e), i.delete(t), h;
    }
    fp.exports = VR;
  });
  var pp = u((xj, dp) => {
    var WR = et(),
      BR = WR.Uint8Array;
    dp.exports = BR;
  });
  var hp = u((Lj, vp) => {
    function jR(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n, a) {
          r[++t] = [a, n];
        }),
        r
      );
    }
    vp.exports = jR;
  });
  var gp = u((Mj, Ep) => {
    function HR(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n) {
          r[++t] = n;
        }),
        r
      );
    }
    Ep.exports = HR;
  });
  var Tp = u((Dj, mp) => {
    var _p = Zt(),
      yp = pp(),
      kR = Dn(),
      KR = uo(),
      zR = hp(),
      YR = gp(),
      $R = 1,
      QR = 2,
      ZR = "[object Boolean]",
      JR = "[object Date]",
      eC = "[object Error]",
      tC = "[object Map]",
      rC = "[object Number]",
      nC = "[object RegExp]",
      iC = "[object Set]",
      aC = "[object String]",
      oC = "[object Symbol]",
      sC = "[object ArrayBuffer]",
      uC = "[object DataView]",
      Ip = _p ? _p.prototype : void 0,
      co = Ip ? Ip.valueOf : void 0;
    function cC(e, t, r, n, a, i, o) {
      switch (r) {
        case uC:
          if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
            return !1;
          (e = e.buffer), (t = t.buffer);
        case sC:
          return !(e.byteLength != t.byteLength || !i(new yp(e), new yp(t)));
        case ZR:
        case JR:
        case rC:
          return kR(+e, +t);
        case eC:
          return e.name == t.name && e.message == t.message;
        case nC:
        case aC:
          return e == t + "";
        case tC:
          var s = zR;
        case iC:
          var c = n & $R;
          if ((s || (s = YR), e.size != t.size && !c)) return !1;
          var d = o.get(e);
          if (d) return d == t;
          (n |= QR), o.set(e, t);
          var v = KR(s(e), s(t), n, a, i, o);
          return o.delete(e), v;
        case oC:
          if (co) return co.call(e) == co.call(t);
      }
      return !1;
    }
    mp.exports = cC;
  });
  var Un = u((Fj, Op) => {
    function lC(e, t) {
      for (var r = -1, n = t.length, a = e.length; ++r < n; ) e[a + r] = t[r];
      return e;
    }
    Op.exports = lC;
  });
  var Re = u((Gj, bp) => {
    var fC = Array.isArray;
    bp.exports = fC;
  });
  var lo = u((Xj, Sp) => {
    var dC = Un(),
      pC = Re();
    function vC(e, t, r) {
      var n = t(e);
      return pC(e) ? n : dC(n, r(e));
    }
    Sp.exports = vC;
  });
  var wp = u((Uj, Ap) => {
    function hC(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, a = 0, i = []; ++r < n; ) {
        var o = e[r];
        t(o, r, e) && (i[a++] = o);
      }
      return i;
    }
    Ap.exports = hC;
  });
  var fo = u((Vj, Rp) => {
    function EC() {
      return [];
    }
    Rp.exports = EC;
  });
  var po = u((Wj, Np) => {
    var gC = wp(),
      _C = fo(),
      yC = Object.prototype,
      IC = yC.propertyIsEnumerable,
      Cp = Object.getOwnPropertySymbols,
      mC = Cp
        ? function (e) {
            return e == null
              ? []
              : ((e = Object(e)),
                gC(Cp(e), function (t) {
                  return IC.call(e, t);
                }));
          }
        : _C;
    Np.exports = mC;
  });
  var qp = u((Bj, Pp) => {
    function TC(e, t) {
      for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
      return n;
    }
    Pp.exports = TC;
  });
  var Lp = u((jj, xp) => {
    var OC = St(),
      bC = _t(),
      SC = "[object Arguments]";
    function AC(e) {
      return bC(e) && OC(e) == SC;
    }
    xp.exports = AC;
  });
  var Ur = u((Hj, Fp) => {
    var Mp = Lp(),
      wC = _t(),
      Dp = Object.prototype,
      RC = Dp.hasOwnProperty,
      CC = Dp.propertyIsEnumerable,
      NC = Mp(
        (function () {
          return arguments;
        })()
      )
        ? Mp
        : function (e) {
            return wC(e) && RC.call(e, "callee") && !CC.call(e, "callee");
          };
    Fp.exports = NC;
  });
  var Xp = u((kj, Gp) => {
    function PC() {
      return !1;
    }
    Gp.exports = PC;
  });
  var Vn = u((Vr, ur) => {
    var qC = et(),
      xC = Xp(),
      Wp = typeof Vr == "object" && Vr && !Vr.nodeType && Vr,
      Up = Wp && typeof ur == "object" && ur && !ur.nodeType && ur,
      LC = Up && Up.exports === Wp,
      Vp = LC ? qC.Buffer : void 0,
      MC = Vp ? Vp.isBuffer : void 0,
      DC = MC || xC;
    ur.exports = DC;
  });
  var Wn = u((Kj, Bp) => {
    var FC = 9007199254740991,
      GC = /^(?:0|[1-9]\d*)$/;
    function XC(e, t) {
      var r = typeof e;
      return (
        (t = t ?? FC),
        !!t &&
          (r == "number" || (r != "symbol" && GC.test(e))) &&
          e > -1 &&
          e % 1 == 0 &&
          e < t
      );
    }
    Bp.exports = XC;
  });
  var Bn = u((zj, jp) => {
    var UC = 9007199254740991;
    function VC(e) {
      return typeof e == "number" && e > -1 && e % 1 == 0 && e <= UC;
    }
    jp.exports = VC;
  });
  var kp = u((Yj, Hp) => {
    var WC = St(),
      BC = Bn(),
      jC = _t(),
      HC = "[object Arguments]",
      kC = "[object Array]",
      KC = "[object Boolean]",
      zC = "[object Date]",
      YC = "[object Error]",
      $C = "[object Function]",
      QC = "[object Map]",
      ZC = "[object Number]",
      JC = "[object Object]",
      eN = "[object RegExp]",
      tN = "[object Set]",
      rN = "[object String]",
      nN = "[object WeakMap]",
      iN = "[object ArrayBuffer]",
      aN = "[object DataView]",
      oN = "[object Float32Array]",
      sN = "[object Float64Array]",
      uN = "[object Int8Array]",
      cN = "[object Int16Array]",
      lN = "[object Int32Array]",
      fN = "[object Uint8Array]",
      dN = "[object Uint8ClampedArray]",
      pN = "[object Uint16Array]",
      vN = "[object Uint32Array]",
      ve = {};
    ve[oN] =
      ve[sN] =
      ve[uN] =
      ve[cN] =
      ve[lN] =
      ve[fN] =
      ve[dN] =
      ve[pN] =
      ve[vN] =
        !0;
    ve[HC] =
      ve[kC] =
      ve[iN] =
      ve[KC] =
      ve[aN] =
      ve[zC] =
      ve[YC] =
      ve[$C] =
      ve[QC] =
      ve[ZC] =
      ve[JC] =
      ve[eN] =
      ve[tN] =
      ve[rN] =
      ve[nN] =
        !1;
    function hN(e) {
      return jC(e) && BC(e.length) && !!ve[WC(e)];
    }
    Hp.exports = hN;
  });
  var zp = u(($j, Kp) => {
    function EN(e) {
      return function (t) {
        return e(t);
      };
    }
    Kp.exports = EN;
  });
  var $p = u((Wr, cr) => {
    var gN = Ma(),
      Yp = typeof Wr == "object" && Wr && !Wr.nodeType && Wr,
      Br = Yp && typeof cr == "object" && cr && !cr.nodeType && cr,
      _N = Br && Br.exports === Yp,
      vo = _N && gN.process,
      yN = (function () {
        try {
          var e = Br && Br.require && Br.require("util").types;
          return e || (vo && vo.binding && vo.binding("util"));
        } catch {}
      })();
    cr.exports = yN;
  });
  var jn = u((Qj, Jp) => {
    var IN = kp(),
      mN = zp(),
      Qp = $p(),
      Zp = Qp && Qp.isTypedArray,
      TN = Zp ? mN(Zp) : IN;
    Jp.exports = TN;
  });
  var ho = u((Zj, ev) => {
    var ON = qp(),
      bN = Ur(),
      SN = Re(),
      AN = Vn(),
      wN = Wn(),
      RN = jn(),
      CN = Object.prototype,
      NN = CN.hasOwnProperty;
    function PN(e, t) {
      var r = SN(e),
        n = !r && bN(e),
        a = !r && !n && AN(e),
        i = !r && !n && !a && RN(e),
        o = r || n || a || i,
        s = o ? ON(e.length, String) : [],
        c = s.length;
      for (var d in e)
        (t || NN.call(e, d)) &&
          !(
            o &&
            (d == "length" ||
              (a && (d == "offset" || d == "parent")) ||
              (i &&
                (d == "buffer" || d == "byteLength" || d == "byteOffset")) ||
              wN(d, c))
          ) &&
          s.push(d);
      return s;
    }
    ev.exports = PN;
  });
  var Hn = u((Jj, tv) => {
    var qN = Object.prototype;
    function xN(e) {
      var t = e && e.constructor,
        r = (typeof t == "function" && t.prototype) || qN;
      return e === r;
    }
    tv.exports = xN;
  });
  var nv = u((eH, rv) => {
    var LN = Da(),
      MN = LN(Object.keys, Object);
    rv.exports = MN;
  });
  var kn = u((tH, iv) => {
    var DN = Hn(),
      FN = nv(),
      GN = Object.prototype,
      XN = GN.hasOwnProperty;
    function UN(e) {
      if (!DN(e)) return FN(e);
      var t = [];
      for (var r in Object(e)) XN.call(e, r) && r != "constructor" && t.push(r);
      return t;
    }
    iv.exports = UN;
  });
  var Gt = u((rH, av) => {
    var VN = io(),
      WN = Bn();
    function BN(e) {
      return e != null && WN(e.length) && !VN(e);
    }
    av.exports = BN;
  });
  var jr = u((nH, ov) => {
    var jN = ho(),
      HN = kn(),
      kN = Gt();
    function KN(e) {
      return kN(e) ? jN(e) : HN(e);
    }
    ov.exports = KN;
  });
  var uv = u((iH, sv) => {
    var zN = lo(),
      YN = po(),
      $N = jr();
    function QN(e) {
      return zN(e, $N, YN);
    }
    sv.exports = QN;
  });
  var fv = u((aH, lv) => {
    var cv = uv(),
      ZN = 1,
      JN = Object.prototype,
      eP = JN.hasOwnProperty;
    function tP(e, t, r, n, a, i) {
      var o = r & ZN,
        s = cv(e),
        c = s.length,
        d = cv(t),
        v = d.length;
      if (c != v && !o) return !1;
      for (var p = c; p--; ) {
        var h = s[p];
        if (!(o ? h in t : eP.call(t, h))) return !1;
      }
      var I = i.get(e),
        m = i.get(t);
      if (I && m) return I == t && m == e;
      var T = !0;
      i.set(e, t), i.set(t, e);
      for (var L = o; ++p < c; ) {
        h = s[p];
        var C = e[h],
          N = t[h];
        if (n) var A = o ? n(N, C, h, t, e, i) : n(C, N, h, e, t, i);
        if (!(A === void 0 ? C === N || a(C, N, r, n, i) : A)) {
          T = !1;
          break;
        }
        L || (L = h == "constructor");
      }
      if (T && !L) {
        var M = e.constructor,
          q = t.constructor;
        M != q &&
          "constructor" in e &&
          "constructor" in t &&
          !(
            typeof M == "function" &&
            M instanceof M &&
            typeof q == "function" &&
            q instanceof q
          ) &&
          (T = !1);
      }
      return i.delete(e), i.delete(t), T;
    }
    lv.exports = tP;
  });
  var pv = u((oH, dv) => {
    var rP = At(),
      nP = et(),
      iP = rP(nP, "DataView");
    dv.exports = iP;
  });
  var hv = u((sH, vv) => {
    var aP = At(),
      oP = et(),
      sP = aP(oP, "Promise");
    vv.exports = sP;
  });
  var gv = u((uH, Ev) => {
    var uP = At(),
      cP = et(),
      lP = uP(cP, "Set");
    Ev.exports = lP;
  });
  var Eo = u((cH, _v) => {
    var fP = At(),
      dP = et(),
      pP = fP(dP, "WeakMap");
    _v.exports = pP;
  });
  var Kn = u((lH, Sv) => {
    var go = pv(),
      _o = Fn(),
      yo = hv(),
      Io = gv(),
      mo = Eo(),
      bv = St(),
      lr = oo(),
      yv = "[object Map]",
      vP = "[object Object]",
      Iv = "[object Promise]",
      mv = "[object Set]",
      Tv = "[object WeakMap]",
      Ov = "[object DataView]",
      hP = lr(go),
      EP = lr(_o),
      gP = lr(yo),
      _P = lr(Io),
      yP = lr(mo),
      Xt = bv;
    ((go && Xt(new go(new ArrayBuffer(1))) != Ov) ||
      (_o && Xt(new _o()) != yv) ||
      (yo && Xt(yo.resolve()) != Iv) ||
      (Io && Xt(new Io()) != mv) ||
      (mo && Xt(new mo()) != Tv)) &&
      (Xt = function (e) {
        var t = bv(e),
          r = t == vP ? e.constructor : void 0,
          n = r ? lr(r) : "";
        if (n)
          switch (n) {
            case hP:
              return Ov;
            case EP:
              return yv;
            case gP:
              return Iv;
            case _P:
              return mv;
            case yP:
              return Tv;
          }
        return t;
      });
    Sv.exports = Xt;
  });
  var xv = u((fH, qv) => {
    var To = so(),
      IP = uo(),
      mP = Tp(),
      TP = fv(),
      Av = Kn(),
      wv = Re(),
      Rv = Vn(),
      OP = jn(),
      bP = 1,
      Cv = "[object Arguments]",
      Nv = "[object Array]",
      zn = "[object Object]",
      SP = Object.prototype,
      Pv = SP.hasOwnProperty;
    function AP(e, t, r, n, a, i) {
      var o = wv(e),
        s = wv(t),
        c = o ? Nv : Av(e),
        d = s ? Nv : Av(t);
      (c = c == Cv ? zn : c), (d = d == Cv ? zn : d);
      var v = c == zn,
        p = d == zn,
        h = c == d;
      if (h && Rv(e)) {
        if (!Rv(t)) return !1;
        (o = !0), (v = !1);
      }
      if (h && !v)
        return (
          i || (i = new To()),
          o || OP(e) ? IP(e, t, r, n, a, i) : mP(e, t, c, r, n, a, i)
        );
      if (!(r & bP)) {
        var I = v && Pv.call(e, "__wrapped__"),
          m = p && Pv.call(t, "__wrapped__");
        if (I || m) {
          var T = I ? e.value() : e,
            L = m ? t.value() : t;
          return i || (i = new To()), a(T, L, r, n, i);
        }
      }
      return h ? (i || (i = new To()), TP(e, t, r, n, a, i)) : !1;
    }
    qv.exports = AP;
  });
  var Oo = u((dH, Dv) => {
    var wP = xv(),
      Lv = _t();
    function Mv(e, t, r, n, a) {
      return e === t
        ? !0
        : e == null || t == null || (!Lv(e) && !Lv(t))
        ? e !== e && t !== t
        : wP(e, t, r, n, Mv, a);
    }
    Dv.exports = Mv;
  });
  var Gv = u((pH, Fv) => {
    var RP = so(),
      CP = Oo(),
      NP = 1,
      PP = 2;
    function qP(e, t, r, n) {
      var a = r.length,
        i = a,
        o = !n;
      if (e == null) return !i;
      for (e = Object(e); a--; ) {
        var s = r[a];
        if (o && s[2] ? s[1] !== e[s[0]] : !(s[0] in e)) return !1;
      }
      for (; ++a < i; ) {
        s = r[a];
        var c = s[0],
          d = e[c],
          v = s[1];
        if (o && s[2]) {
          if (d === void 0 && !(c in e)) return !1;
        } else {
          var p = new RP();
          if (n) var h = n(d, v, c, e, t, p);
          if (!(h === void 0 ? CP(v, d, NP | PP, n, p) : h)) return !1;
        }
      }
      return !0;
    }
    Fv.exports = qP;
  });
  var bo = u((vH, Xv) => {
    var xP = lt();
    function LP(e) {
      return e === e && !xP(e);
    }
    Xv.exports = LP;
  });
  var Vv = u((hH, Uv) => {
    var MP = bo(),
      DP = jr();
    function FP(e) {
      for (var t = DP(e), r = t.length; r--; ) {
        var n = t[r],
          a = e[n];
        t[r] = [n, a, MP(a)];
      }
      return t;
    }
    Uv.exports = FP;
  });
  var So = u((EH, Wv) => {
    function GP(e, t) {
      return function (r) {
        return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
      };
    }
    Wv.exports = GP;
  });
  var jv = u((gH, Bv) => {
    var XP = Gv(),
      UP = Vv(),
      VP = So();
    function WP(e) {
      var t = UP(e);
      return t.length == 1 && t[0][2]
        ? VP(t[0][0], t[0][1])
        : function (r) {
            return r === e || XP(r, e, t);
          };
    }
    Bv.exports = WP;
  });
  var Hr = u((_H, Hv) => {
    var BP = St(),
      jP = _t(),
      HP = "[object Symbol]";
    function kP(e) {
      return typeof e == "symbol" || (jP(e) && BP(e) == HP);
    }
    Hv.exports = kP;
  });
  var Yn = u((yH, kv) => {
    var KP = Re(),
      zP = Hr(),
      YP = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      $P = /^\w*$/;
    function QP(e, t) {
      if (KP(e)) return !1;
      var r = typeof e;
      return r == "number" ||
        r == "symbol" ||
        r == "boolean" ||
        e == null ||
        zP(e)
        ? !0
        : $P.test(e) || !YP.test(e) || (t != null && e in Object(t));
    }
    kv.exports = QP;
  });
  var Yv = u((IH, zv) => {
    var Kv = Gn(),
      ZP = "Expected a function";
    function Ao(e, t) {
      if (typeof e != "function" || (t != null && typeof t != "function"))
        throw new TypeError(ZP);
      var r = function () {
        var n = arguments,
          a = t ? t.apply(this, n) : n[0],
          i = r.cache;
        if (i.has(a)) return i.get(a);
        var o = e.apply(this, n);
        return (r.cache = i.set(a, o) || i), o;
      };
      return (r.cache = new (Ao.Cache || Kv)()), r;
    }
    Ao.Cache = Kv;
    zv.exports = Ao;
  });
  var Qv = u((mH, $v) => {
    var JP = Yv(),
      eq = 500;
    function tq(e) {
      var t = JP(e, function (n) {
          return r.size === eq && r.clear(), n;
        }),
        r = t.cache;
      return t;
    }
    $v.exports = tq;
  });
  var Jv = u((TH, Zv) => {
    var rq = Qv(),
      nq =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      iq = /\\(\\)?/g,
      aq = rq(function (e) {
        var t = [];
        return (
          e.charCodeAt(0) === 46 && t.push(""),
          e.replace(nq, function (r, n, a, i) {
            t.push(a ? i.replace(iq, "$1") : n || r);
          }),
          t
        );
      });
    Zv.exports = aq;
  });
  var wo = u((OH, eh) => {
    function oq(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, a = Array(n); ++r < n; )
        a[r] = t(e[r], r, e);
      return a;
    }
    eh.exports = oq;
  });
  var oh = u((bH, ah) => {
    var th = Zt(),
      sq = wo(),
      uq = Re(),
      cq = Hr(),
      lq = 1 / 0,
      rh = th ? th.prototype : void 0,
      nh = rh ? rh.toString : void 0;
    function ih(e) {
      if (typeof e == "string") return e;
      if (uq(e)) return sq(e, ih) + "";
      if (cq(e)) return nh ? nh.call(e) : "";
      var t = e + "";
      return t == "0" && 1 / e == -lq ? "-0" : t;
    }
    ah.exports = ih;
  });
  var uh = u((SH, sh) => {
    var fq = oh();
    function dq(e) {
      return e == null ? "" : fq(e);
    }
    sh.exports = dq;
  });
  var kr = u((AH, ch) => {
    var pq = Re(),
      vq = Yn(),
      hq = Jv(),
      Eq = uh();
    function gq(e, t) {
      return pq(e) ? e : vq(e, t) ? [e] : hq(Eq(e));
    }
    ch.exports = gq;
  });
  var fr = u((wH, lh) => {
    var _q = Hr(),
      yq = 1 / 0;
    function Iq(e) {
      if (typeof e == "string" || _q(e)) return e;
      var t = e + "";
      return t == "0" && 1 / e == -yq ? "-0" : t;
    }
    lh.exports = Iq;
  });
  var $n = u((RH, fh) => {
    var mq = kr(),
      Tq = fr();
    function Oq(e, t) {
      t = mq(t, e);
      for (var r = 0, n = t.length; e != null && r < n; ) e = e[Tq(t[r++])];
      return r && r == n ? e : void 0;
    }
    fh.exports = Oq;
  });
  var Qn = u((CH, dh) => {
    var bq = $n();
    function Sq(e, t, r) {
      var n = e == null ? void 0 : bq(e, t);
      return n === void 0 ? r : n;
    }
    dh.exports = Sq;
  });
  var vh = u((NH, ph) => {
    function Aq(e, t) {
      return e != null && t in Object(e);
    }
    ph.exports = Aq;
  });
  var Eh = u((PH, hh) => {
    var wq = kr(),
      Rq = Ur(),
      Cq = Re(),
      Nq = Wn(),
      Pq = Bn(),
      qq = fr();
    function xq(e, t, r) {
      t = wq(t, e);
      for (var n = -1, a = t.length, i = !1; ++n < a; ) {
        var o = qq(t[n]);
        if (!(i = e != null && r(e, o))) break;
        e = e[o];
      }
      return i || ++n != a
        ? i
        : ((a = e == null ? 0 : e.length),
          !!a && Pq(a) && Nq(o, a) && (Cq(e) || Rq(e)));
    }
    hh.exports = xq;
  });
  var _h = u((qH, gh) => {
    var Lq = vh(),
      Mq = Eh();
    function Dq(e, t) {
      return e != null && Mq(e, t, Lq);
    }
    gh.exports = Dq;
  });
  var Ih = u((xH, yh) => {
    var Fq = Oo(),
      Gq = Qn(),
      Xq = _h(),
      Uq = Yn(),
      Vq = bo(),
      Wq = So(),
      Bq = fr(),
      jq = 1,
      Hq = 2;
    function kq(e, t) {
      return Uq(e) && Vq(t)
        ? Wq(Bq(e), t)
        : function (r) {
            var n = Gq(r, e);
            return n === void 0 && n === t ? Xq(r, e) : Fq(t, n, jq | Hq);
          };
    }
    yh.exports = kq;
  });
  var Zn = u((LH, mh) => {
    function Kq(e) {
      return e;
    }
    mh.exports = Kq;
  });
  var Ro = u((MH, Th) => {
    function zq(e) {
      return function (t) {
        return t?.[e];
      };
    }
    Th.exports = zq;
  });
  var bh = u((DH, Oh) => {
    var Yq = $n();
    function $q(e) {
      return function (t) {
        return Yq(t, e);
      };
    }
    Oh.exports = $q;
  });
  var Ah = u((FH, Sh) => {
    var Qq = Ro(),
      Zq = bh(),
      Jq = Yn(),
      ex = fr();
    function tx(e) {
      return Jq(e) ? Qq(ex(e)) : Zq(e);
    }
    Sh.exports = tx;
  });
  var wt = u((GH, wh) => {
    var rx = jv(),
      nx = Ih(),
      ix = Zn(),
      ax = Re(),
      ox = Ah();
    function sx(e) {
      return typeof e == "function"
        ? e
        : e == null
        ? ix
        : typeof e == "object"
        ? ax(e)
          ? nx(e[0], e[1])
          : rx(e)
        : ox(e);
    }
    wh.exports = sx;
  });
  var Co = u((XH, Rh) => {
    var ux = wt(),
      cx = Gt(),
      lx = jr();
    function fx(e) {
      return function (t, r, n) {
        var a = Object(t);
        if (!cx(t)) {
          var i = ux(r, 3);
          (t = lx(t)),
            (r = function (s) {
              return i(a[s], s, a);
            });
        }
        var o = e(t, r, n);
        return o > -1 ? a[i ? t[o] : o] : void 0;
      };
    }
    Rh.exports = fx;
  });
  var No = u((UH, Ch) => {
    function dx(e, t, r, n) {
      for (var a = e.length, i = r + (n ? 1 : -1); n ? i-- : ++i < a; )
        if (t(e[i], i, e)) return i;
      return -1;
    }
    Ch.exports = dx;
  });
  var Ph = u((VH, Nh) => {
    var px = /\s/;
    function vx(e) {
      for (var t = e.length; t-- && px.test(e.charAt(t)); );
      return t;
    }
    Nh.exports = vx;
  });
  var xh = u((WH, qh) => {
    var hx = Ph(),
      Ex = /^\s+/;
    function gx(e) {
      return e && e.slice(0, hx(e) + 1).replace(Ex, "");
    }
    qh.exports = gx;
  });
  var Jn = u((BH, Dh) => {
    var _x = xh(),
      Lh = lt(),
      yx = Hr(),
      Mh = 0 / 0,
      Ix = /^[-+]0x[0-9a-f]+$/i,
      mx = /^0b[01]+$/i,
      Tx = /^0o[0-7]+$/i,
      Ox = parseInt;
    function bx(e) {
      if (typeof e == "number") return e;
      if (yx(e)) return Mh;
      if (Lh(e)) {
        var t = typeof e.valueOf == "function" ? e.valueOf() : e;
        e = Lh(t) ? t + "" : t;
      }
      if (typeof e != "string") return e === 0 ? e : +e;
      e = _x(e);
      var r = mx.test(e);
      return r || Tx.test(e) ? Ox(e.slice(2), r ? 2 : 8) : Ix.test(e) ? Mh : +e;
    }
    Dh.exports = bx;
  });
  var Xh = u((jH, Gh) => {
    var Sx = Jn(),
      Fh = 1 / 0,
      Ax = 17976931348623157e292;
    function wx(e) {
      if (!e) return e === 0 ? e : 0;
      if (((e = Sx(e)), e === Fh || e === -Fh)) {
        var t = e < 0 ? -1 : 1;
        return t * Ax;
      }
      return e === e ? e : 0;
    }
    Gh.exports = wx;
  });
  var Po = u((HH, Uh) => {
    var Rx = Xh();
    function Cx(e) {
      var t = Rx(e),
        r = t % 1;
      return t === t ? (r ? t - r : t) : 0;
    }
    Uh.exports = Cx;
  });
  var Wh = u((kH, Vh) => {
    var Nx = No(),
      Px = wt(),
      qx = Po(),
      xx = Math.max;
    function Lx(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var a = r == null ? 0 : qx(r);
      return a < 0 && (a = xx(n + a, 0)), Nx(e, Px(t, 3), a);
    }
    Vh.exports = Lx;
  });
  var qo = u((KH, Bh) => {
    var Mx = Co(),
      Dx = Wh(),
      Fx = Mx(Dx);
    Bh.exports = Fx;
  });
  var ti = u((Me) => {
    "use strict";
    var Gx = Qe().default;
    Object.defineProperty(Me, "__esModule", { value: !0 });
    Me.withBrowser =
      Me.TRANSFORM_STYLE_PREFIXED =
      Me.TRANSFORM_PREFIXED =
      Me.IS_BROWSER_ENV =
      Me.FLEX_PREFIXED =
      Me.ELEMENT_MATCHES =
        void 0;
    var Xx = Gx(qo()),
      Hh = typeof window < "u";
    Me.IS_BROWSER_ENV = Hh;
    var ei = (e, t) => (Hh ? e() : t);
    Me.withBrowser = ei;
    var Ux = ei(() =>
      (0, Xx.default)(
        [
          "matches",
          "matchesSelector",
          "mozMatchesSelector",
          "msMatchesSelector",
          "oMatchesSelector",
          "webkitMatchesSelector",
        ],
        (e) => e in Element.prototype
      )
    );
    Me.ELEMENT_MATCHES = Ux;
    var Vx = ei(() => {
      let e = document.createElement("i"),
        t = ["flex", "-webkit-flex", "-ms-flexbox", "-moz-box", "-webkit-box"],
        r = "";
      try {
        let { length: n } = t;
        for (let a = 0; a < n; a++) {
          let i = t[a];
          if (((e.style.display = i), e.style.display === i)) return i;
        }
        return r;
      } catch {
        return r;
      }
    }, "flex");
    Me.FLEX_PREFIXED = Vx;
    var kh = ei(() => {
      let e = document.createElement("i");
      if (e.style.transform == null) {
        let t = ["Webkit", "Moz", "ms"],
          r = "Transform",
          { length: n } = t;
        for (let a = 0; a < n; a++) {
          let i = t[a] + r;
          if (e.style[i] !== void 0) return i;
        }
      }
      return "transform";
    }, "transform");
    Me.TRANSFORM_PREFIXED = kh;
    var jh = kh.split("transform")[0],
      Wx = jh ? jh + "TransformStyle" : "transformStyle";
    Me.TRANSFORM_STYLE_PREFIXED = Wx;
  });
  var xo = u((YH, Qh) => {
    var Bx = 4,
      jx = 0.001,
      Hx = 1e-7,
      kx = 10,
      Kr = 11,
      ri = 1 / (Kr - 1),
      Kx = typeof Float32Array == "function";
    function Kh(e, t) {
      return 1 - 3 * t + 3 * e;
    }
    function zh(e, t) {
      return 3 * t - 6 * e;
    }
    function Yh(e) {
      return 3 * e;
    }
    function ni(e, t, r) {
      return ((Kh(t, r) * e + zh(t, r)) * e + Yh(t)) * e;
    }
    function $h(e, t, r) {
      return 3 * Kh(t, r) * e * e + 2 * zh(t, r) * e + Yh(t);
    }
    function zx(e, t, r, n, a) {
      var i,
        o,
        s = 0;
      do
        (o = t + (r - t) / 2), (i = ni(o, n, a) - e), i > 0 ? (r = o) : (t = o);
      while (Math.abs(i) > Hx && ++s < kx);
      return o;
    }
    function Yx(e, t, r, n) {
      for (var a = 0; a < Bx; ++a) {
        var i = $h(t, r, n);
        if (i === 0) return t;
        var o = ni(t, r, n) - e;
        t -= o / i;
      }
      return t;
    }
    Qh.exports = function (t, r, n, a) {
      if (!(0 <= t && t <= 1 && 0 <= n && n <= 1))
        throw new Error("bezier x values must be in [0, 1] range");
      var i = Kx ? new Float32Array(Kr) : new Array(Kr);
      if (t !== r || n !== a)
        for (var o = 0; o < Kr; ++o) i[o] = ni(o * ri, t, n);
      function s(c) {
        for (var d = 0, v = 1, p = Kr - 1; v !== p && i[v] <= c; ++v) d += ri;
        --v;
        var h = (c - i[v]) / (i[v + 1] - i[v]),
          I = d + h * ri,
          m = $h(I, t, n);
        return m >= jx ? Yx(c, I, t, n) : m === 0 ? I : zx(c, d, d + ri, t, n);
      }
      return function (d) {
        return t === r && n === a
          ? d
          : d === 0
          ? 0
          : d === 1
          ? 1
          : ni(s(d), r, a);
      };
    };
  });
  var Lo = u((te) => {
    "use strict";
    var $x = Qe().default;
    Object.defineProperty(te, "__esModule", { value: !0 });
    te.bounce = qL;
    te.bouncePast = xL;
    te.easeOut = te.easeInOut = te.easeIn = te.ease = void 0;
    te.inBack = OL;
    te.inCirc = yL;
    te.inCubic = iL;
    te.inElastic = AL;
    te.inExpo = EL;
    te.inOutBack = SL;
    te.inOutCirc = mL;
    te.inOutCubic = oL;
    te.inOutElastic = RL;
    te.inOutExpo = _L;
    te.inOutQuad = nL;
    te.inOutQuart = cL;
    te.inOutQuint = dL;
    te.inOutSine = hL;
    te.inQuad = tL;
    te.inQuart = sL;
    te.inQuint = lL;
    te.inSine = pL;
    te.outBack = bL;
    te.outBounce = TL;
    te.outCirc = IL;
    te.outCubic = aL;
    te.outElastic = wL;
    te.outExpo = gL;
    te.outQuad = rL;
    te.outQuart = uL;
    te.outQuint = fL;
    te.outSine = vL;
    te.swingFrom = NL;
    te.swingFromTo = CL;
    te.swingTo = PL;
    var ii = $x(xo()),
      It = 1.70158,
      Qx = (0, ii.default)(0.25, 0.1, 0.25, 1);
    te.ease = Qx;
    var Zx = (0, ii.default)(0.42, 0, 1, 1);
    te.easeIn = Zx;
    var Jx = (0, ii.default)(0, 0, 0.58, 1);
    te.easeOut = Jx;
    var eL = (0, ii.default)(0.42, 0, 0.58, 1);
    te.easeInOut = eL;
    function tL(e) {
      return Math.pow(e, 2);
    }
    function rL(e) {
      return -(Math.pow(e - 1, 2) - 1);
    }
    function nL(e) {
      return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 2) : -0.5 * ((e -= 2) * e - 2);
    }
    function iL(e) {
      return Math.pow(e, 3);
    }
    function aL(e) {
      return Math.pow(e - 1, 3) + 1;
    }
    function oL(e) {
      return (e /= 0.5) < 1
        ? 0.5 * Math.pow(e, 3)
        : 0.5 * (Math.pow(e - 2, 3) + 2);
    }
    function sL(e) {
      return Math.pow(e, 4);
    }
    function uL(e) {
      return -(Math.pow(e - 1, 4) - 1);
    }
    function cL(e) {
      return (e /= 0.5) < 1
        ? 0.5 * Math.pow(e, 4)
        : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
    }
    function lL(e) {
      return Math.pow(e, 5);
    }
    function fL(e) {
      return Math.pow(e - 1, 5) + 1;
    }
    function dL(e) {
      return (e /= 0.5) < 1
        ? 0.5 * Math.pow(e, 5)
        : 0.5 * (Math.pow(e - 2, 5) + 2);
    }
    function pL(e) {
      return -Math.cos(e * (Math.PI / 2)) + 1;
    }
    function vL(e) {
      return Math.sin(e * (Math.PI / 2));
    }
    function hL(e) {
      return -0.5 * (Math.cos(Math.PI * e) - 1);
    }
    function EL(e) {
      return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
    }
    function gL(e) {
      return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
    }
    function _L(e) {
      return e === 0
        ? 0
        : e === 1
        ? 1
        : (e /= 0.5) < 1
        ? 0.5 * Math.pow(2, 10 * (e - 1))
        : 0.5 * (-Math.pow(2, -10 * --e) + 2);
    }
    function yL(e) {
      return -(Math.sqrt(1 - e * e) - 1);
    }
    function IL(e) {
      return Math.sqrt(1 - Math.pow(e - 1, 2));
    }
    function mL(e) {
      return (e /= 0.5) < 1
        ? -0.5 * (Math.sqrt(1 - e * e) - 1)
        : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
    }
    function TL(e) {
      return e < 1 / 2.75
        ? 7.5625 * e * e
        : e < 2 / 2.75
        ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
        : e < 2.5 / 2.75
        ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
        : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
    }
    function OL(e) {
      let t = It;
      return e * e * ((t + 1) * e - t);
    }
    function bL(e) {
      let t = It;
      return (e -= 1) * e * ((t + 1) * e + t) + 1;
    }
    function SL(e) {
      let t = It;
      return (e /= 0.5) < 1
        ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
        : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
    }
    function AL(e) {
      let t = It,
        r = 0,
        n = 1;
      return e === 0
        ? 0
        : e === 1
        ? 1
        : (r || (r = 0.3),
          n < 1
            ? ((n = 1), (t = r / 4))
            : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
          -(
            n *
            Math.pow(2, 10 * (e -= 1)) *
            Math.sin(((e - t) * (2 * Math.PI)) / r)
          ));
    }
    function wL(e) {
      let t = It,
        r = 0,
        n = 1;
      return e === 0
        ? 0
        : e === 1
        ? 1
        : (r || (r = 0.3),
          n < 1
            ? ((n = 1), (t = r / 4))
            : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
          n * Math.pow(2, -10 * e) * Math.sin(((e - t) * (2 * Math.PI)) / r) +
            1);
    }
    function RL(e) {
      let t = It,
        r = 0,
        n = 1;
      return e === 0
        ? 0
        : (e /= 1 / 2) === 2
        ? 1
        : (r || (r = 0.3 * 1.5),
          n < 1
            ? ((n = 1), (t = r / 4))
            : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
          e < 1
            ? -0.5 *
              (n *
                Math.pow(2, 10 * (e -= 1)) *
                Math.sin(((e - t) * (2 * Math.PI)) / r))
            : n *
                Math.pow(2, -10 * (e -= 1)) *
                Math.sin(((e - t) * (2 * Math.PI)) / r) *
                0.5 +
              1);
    }
    function CL(e) {
      let t = It;
      return (e /= 0.5) < 1
        ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
        : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
    }
    function NL(e) {
      let t = It;
      return e * e * ((t + 1) * e - t);
    }
    function PL(e) {
      let t = It;
      return (e -= 1) * e * ((t + 1) * e + t) + 1;
    }
    function qL(e) {
      return e < 1 / 2.75
        ? 7.5625 * e * e
        : e < 2 / 2.75
        ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
        : e < 2.5 / 2.75
        ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
        : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
    }
    function xL(e) {
      return e < 1 / 2.75
        ? 7.5625 * e * e
        : e < 2 / 2.75
        ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
        : e < 2.5 / 2.75
        ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
        : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
    }
  });
  var Do = u((zr) => {
    "use strict";
    var LL = Qe().default,
      ML = Lt().default;
    Object.defineProperty(zr, "__esModule", { value: !0 });
    zr.applyEasing = GL;
    zr.createBezierEasing = FL;
    zr.optimizeFloat = Mo;
    var Zh = ML(Lo()),
      DL = LL(xo());
    function Mo(e, t = 5, r = 10) {
      let n = Math.pow(r, t),
        a = Number(Math.round(e * n) / n);
      return Math.abs(a) > 1e-4 ? a : 0;
    }
    function FL(e) {
      return (0, DL.default)(...e);
    }
    function GL(e, t, r) {
      return t === 0
        ? 0
        : t === 1
        ? 1
        : Mo(r ? (t > 0 ? r(t) : t) : t > 0 && e && Zh[e] ? Zh[e](t) : t);
    }
  });
  var rE = u((dr) => {
    "use strict";
    Object.defineProperty(dr, "__esModule", { value: !0 });
    dr.createElementState = tE;
    dr.ixElements = void 0;
    dr.mergeActionState = Fo;
    var ai = nr(),
      eE = Xe(),
      {
        HTML_ELEMENT: ZH,
        PLAIN_OBJECT: XL,
        ABSTRACT_NODE: JH,
        CONFIG_X_VALUE: UL,
        CONFIG_Y_VALUE: VL,
        CONFIG_Z_VALUE: WL,
        CONFIG_VALUE: BL,
        CONFIG_X_UNIT: jL,
        CONFIG_Y_UNIT: HL,
        CONFIG_Z_UNIT: kL,
        CONFIG_UNIT: KL,
      } = eE.IX2EngineConstants,
      {
        IX2_SESSION_STOPPED: zL,
        IX2_INSTANCE_ADDED: YL,
        IX2_ELEMENT_STATE_CHANGED: $L,
      } = eE.IX2EngineActionTypes,
      Jh = {},
      QL = "refState",
      ZL = (e = Jh, t = {}) => {
        switch (t.type) {
          case zL:
            return Jh;
          case YL: {
            let {
                elementId: r,
                element: n,
                origin: a,
                actionItem: i,
                refType: o,
              } = t.payload,
              { actionTypeId: s } = i,
              c = e;
            return (
              (0, ai.getIn)(c, [r, n]) !== n && (c = tE(c, n, o, r, i)),
              Fo(c, r, s, a, i)
            );
          }
          case $L: {
            let {
              elementId: r,
              actionTypeId: n,
              current: a,
              actionItem: i,
            } = t.payload;
            return Fo(e, r, n, a, i);
          }
          default:
            return e;
        }
      };
    dr.ixElements = ZL;
    function tE(e, t, r, n, a) {
      let i =
        r === XL ? (0, ai.getIn)(a, ["config", "target", "objectId"]) : null;
      return (0, ai.mergeIn)(e, [n], { id: n, ref: t, refId: i, refType: r });
    }
    function Fo(e, t, r, n, a) {
      let i = eM(a),
        o = [t, QL, r];
      return (0, ai.mergeIn)(e, o, n, i);
    }
    var JL = [
      [UL, jL],
      [VL, HL],
      [WL, kL],
      [BL, KL],
    ];
    function eM(e) {
      let { config: t } = e;
      return JL.reduce((r, n) => {
        let a = n[0],
          i = n[1],
          o = t[a],
          s = t[i];
        return o != null && s != null && (r[i] = s), r;
      }, {});
    }
  });
  var nE = u((Ce) => {
    "use strict";
    Object.defineProperty(Ce, "__esModule", { value: !0 });
    Ce.renderPlugin =
      Ce.getPluginOrigin =
      Ce.getPluginDuration =
      Ce.getPluginDestination =
      Ce.getPluginConfig =
      Ce.createPluginInstance =
      Ce.clearPlugin =
        void 0;
    var tM = (e) => e.value;
    Ce.getPluginConfig = tM;
    var rM = (e, t) => {
      if (t.config.duration !== "auto") return null;
      let r = parseFloat(e.getAttribute("data-duration"));
      return r > 0
        ? r * 1e3
        : parseFloat(e.getAttribute("data-default-duration")) * 1e3;
    };
    Ce.getPluginDuration = rM;
    var nM = (e) => e || { value: 0 };
    Ce.getPluginOrigin = nM;
    var iM = (e) => ({ value: e.value });
    Ce.getPluginDestination = iM;
    var aM = (e) => {
      let t = window.Webflow.require("lottie").createInstance(e);
      return t.stop(), t.setSubframe(!0), t;
    };
    Ce.createPluginInstance = aM;
    var oM = (e, t, r) => {
      if (!e) return;
      let n = t[r.actionTypeId].value / 100;
      e.goToFrame(e.frames * n);
    };
    Ce.renderPlugin = oM;
    var sM = (e) => {
      window.Webflow.require("lottie").createInstance(e).stop();
    };
    Ce.clearPlugin = sM;
  });
  var aE = u((Ne) => {
    "use strict";
    Object.defineProperty(Ne, "__esModule", { value: !0 });
    Ne.renderPlugin =
      Ne.getPluginOrigin =
      Ne.getPluginDuration =
      Ne.getPluginDestination =
      Ne.getPluginConfig =
      Ne.createPluginInstance =
      Ne.clearPlugin =
        void 0;
    var uM = (e) => document.querySelector(`[data-w-id="${e}"]`),
      cM = () => window.Webflow.require("spline"),
      lM = (e, t) => e.filter((r) => !t.includes(r)),
      fM = (e, t) => e.value[t];
    Ne.getPluginConfig = fM;
    var dM = () => null;
    Ne.getPluginDuration = dM;
    var iE = Object.freeze({
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
      }),
      pM = (e, t) => {
        let r = t.config.value,
          n = Object.keys(r);
        if (e) {
          let i = Object.keys(e),
            o = lM(n, i);
          return o.length ? o.reduce((c, d) => ((c[d] = iE[d]), c), e) : e;
        }
        return n.reduce((i, o) => ((i[o] = iE[o]), i), {});
      };
    Ne.getPluginOrigin = pM;
    var vM = (e) => e.value;
    Ne.getPluginDestination = vM;
    var hM = (e, t) => {
      var r, n;
      let a =
        t == null ||
        (r = t.config) === null ||
        r === void 0 ||
        (n = r.target) === null ||
        n === void 0
          ? void 0
          : n.pluginElement;
      return a ? uM(a) : null;
    };
    Ne.createPluginInstance = hM;
    var EM = (e, t, r) => {
      let n = cM().getInstance(e),
        a = r.config.target.objectId;
      if (!n || !a) return;
      let i = n.spline.findObjectById(a);
      if (!i) return;
      let { PLUGIN_SPLINE: o } = t;
      o.positionX != null && (i.position.x = o.positionX),
        o.positionY != null && (i.position.y = o.positionY),
        o.positionZ != null && (i.position.z = o.positionZ),
        o.rotationX != null && (i.rotation.x = o.rotationX),
        o.rotationY != null && (i.rotation.y = o.rotationY),
        o.rotationZ != null && (i.rotation.z = o.rotationZ),
        o.scaleX != null && (i.scale.x = o.scaleX),
        o.scaleY != null && (i.scale.y = o.scaleY),
        o.scaleZ != null && (i.scale.z = o.scaleZ);
    };
    Ne.renderPlugin = EM;
    var gM = () => null;
    Ne.clearPlugin = gM;
  });
  var sE = u((be) => {
    "use strict";
    Object.defineProperty(be, "__esModule", { value: !0 });
    be.getPluginOrigin =
      be.getPluginDuration =
      be.getPluginDestination =
      be.getPluginConfig =
      be.createPluginInstance =
      be.clearPlugin =
        void 0;
    be.normalizeColor = oE;
    be.renderPlugin = void 0;
    function oE(e) {
      let t,
        r,
        n,
        a = 1,
        i = e.replace(/\s/g, "").toLowerCase();
      if (i.startsWith("#")) {
        let o = i.substring(1);
        o.length === 3
          ? ((t = parseInt(o[0] + o[0], 16)),
            (r = parseInt(o[1] + o[1], 16)),
            (n = parseInt(o[2] + o[2], 16)))
          : o.length === 6 &&
            ((t = parseInt(o.substring(0, 2), 16)),
            (r = parseInt(o.substring(2, 4), 16)),
            (n = parseInt(o.substring(4, 6), 16)));
      } else if (i.startsWith("rgba")) {
        let o = i.match(/rgba\(([^)]+)\)/)[1].split(",");
        (t = parseInt(o[0], 10)),
          (r = parseInt(o[1], 10)),
          (n = parseInt(o[2], 10)),
          (a = parseFloat(o[3]));
      } else if (i.startsWith("rgb")) {
        let o = i.match(/rgb\(([^)]+)\)/)[1].split(",");
        (t = parseInt(o[0], 10)),
          (r = parseInt(o[1], 10)),
          (n = parseInt(o[2], 10));
      } else if (i.startsWith("hsla")) {
        let o = i.match(/hsla\(([^)]+)\)/)[1].split(","),
          s = parseFloat(o[0]),
          c = parseFloat(o[1].replace("%", "")) / 100,
          d = parseFloat(o[2].replace("%", "")) / 100;
        a = parseFloat(o[3]);
        let v = (1 - Math.abs(2 * d - 1)) * c,
          p = v * (1 - Math.abs(((s / 60) % 2) - 1)),
          h = d - v / 2,
          I,
          m,
          T;
        s >= 0 && s < 60
          ? ((I = v), (m = p), (T = 0))
          : s >= 60 && s < 120
          ? ((I = p), (m = v), (T = 0))
          : s >= 120 && s < 180
          ? ((I = 0), (m = v), (T = p))
          : s >= 180 && s < 240
          ? ((I = 0), (m = p), (T = v))
          : s >= 240 && s < 300
          ? ((I = p), (m = 0), (T = v))
          : ((I = v), (m = 0), (T = p)),
          (t = Math.round((I + h) * 255)),
          (r = Math.round((m + h) * 255)),
          (n = Math.round((T + h) * 255));
      } else if (i.startsWith("hsl")) {
        let o = i.match(/hsl\(([^)]+)\)/)[1].split(","),
          s = parseFloat(o[0]),
          c = parseFloat(o[1].replace("%", "")) / 100,
          d = parseFloat(o[2].replace("%", "")) / 100,
          v = (1 - Math.abs(2 * d - 1)) * c,
          p = v * (1 - Math.abs(((s / 60) % 2) - 1)),
          h = d - v / 2,
          I,
          m,
          T;
        s >= 0 && s < 60
          ? ((I = v), (m = p), (T = 0))
          : s >= 60 && s < 120
          ? ((I = p), (m = v), (T = 0))
          : s >= 120 && s < 180
          ? ((I = 0), (m = v), (T = p))
          : s >= 180 && s < 240
          ? ((I = 0), (m = p), (T = v))
          : s >= 240 && s < 300
          ? ((I = p), (m = 0), (T = v))
          : ((I = v), (m = 0), (T = p)),
          (t = Math.round((I + h) * 255)),
          (r = Math.round((m + h) * 255)),
          (n = Math.round((T + h) * 255));
      }
      return (
        (Number.isNaN(t) || Number.isNaN(r) || Number.isNaN(n)) && `${e}`,
        { red: t, green: r, blue: n, alpha: a }
      );
    }
    var _M = (e, t) => e.value[t];
    be.getPluginConfig = _M;
    var yM = () => null;
    be.getPluginDuration = yM;
    var IM = (e, t) => {
      if (e) return e;
      let r = t.config.value,
        n = t.config.target.objectId,
        a = getComputedStyle(document.documentElement).getPropertyValue(n);
      if (r.size != null) return { size: parseInt(a, 10) };
      if (r.red != null && r.green != null && r.blue != null) return oE(a);
    };
    be.getPluginOrigin = IM;
    var mM = (e) => e.value;
    be.getPluginDestination = mM;
    var TM = () => null;
    be.createPluginInstance = TM;
    var OM = (e, t, r) => {
      let n = r.config.target.objectId,
        a = r.config.value.unit,
        { PLUGIN_VARIABLE: i } = t,
        { size: o, red: s, green: c, blue: d, alpha: v } = i,
        p;
      o != null && (p = o + a),
        s != null &&
          d != null &&
          c != null &&
          v != null &&
          (p = `rgba(${s}, ${c}, ${d}, ${v})`),
        p != null && document.documentElement.style.setProperty(n, p);
    };
    be.renderPlugin = OM;
    var bM = (e, t) => {
      let r = t.config.target.objectId;
      document.documentElement.style.removeProperty(r);
    };
    be.clearPlugin = bM;
  });
  var uE = u((oi) => {
    "use strict";
    var Uo = Lt().default,
      SM = Qe().default;
    Object.defineProperty(oi, "__esModule", { value: !0 });
    oi.pluginMethodMap = void 0;
    var Go = SM(rr()),
      Xo = Xe(),
      AM = Uo(nE()),
      wM = Uo(aE()),
      RM = Uo(sE()),
      CM = new Map([
        [Xo.ActionTypeConsts.PLUGIN_LOTTIE, (0, Go.default)({}, AM)],
        [Xo.ActionTypeConsts.PLUGIN_SPLINE, (0, Go.default)({}, wM)],
        [Xo.ActionTypeConsts.PLUGIN_VARIABLE, (0, Go.default)({}, RM)],
      ]);
    oi.pluginMethodMap = CM;
  });
  var Vo = u((Se) => {
    "use strict";
    Object.defineProperty(Se, "__esModule", { value: !0 });
    Se.getPluginOrigin =
      Se.getPluginDuration =
      Se.getPluginDestination =
      Se.getPluginConfig =
      Se.createPluginInstance =
      Se.clearPlugin =
        void 0;
    Se.isPluginType = PM;
    Se.renderPlugin = void 0;
    var NM = ti(),
      cE = uE();
    function PM(e) {
      return cE.pluginMethodMap.has(e);
    }
    var Ut = (e) => (t) => {
        if (!NM.IS_BROWSER_ENV) return () => null;
        let r = cE.pluginMethodMap.get(t);
        if (!r) throw new Error(`IX2 no plugin configured for: ${t}`);
        let n = r[e];
        if (!n) throw new Error(`IX2 invalid plugin method: ${e}`);
        return n;
      },
      qM = Ut("getPluginConfig");
    Se.getPluginConfig = qM;
    var xM = Ut("getPluginOrigin");
    Se.getPluginOrigin = xM;
    var LM = Ut("getPluginDuration");
    Se.getPluginDuration = LM;
    var MM = Ut("getPluginDestination");
    Se.getPluginDestination = MM;
    var DM = Ut("createPluginInstance");
    Se.createPluginInstance = DM;
    var FM = Ut("renderPlugin");
    Se.renderPlugin = FM;
    var GM = Ut("clearPlugin");
    Se.clearPlugin = GM;
  });
  var fE = u((ok, lE) => {
    function XM(e, t) {
      return e == null || e !== e ? t : e;
    }
    lE.exports = XM;
  });
  var pE = u((sk, dE) => {
    function UM(e, t, r, n) {
      var a = -1,
        i = e == null ? 0 : e.length;
      for (n && i && (r = e[++a]); ++a < i; ) r = t(r, e[a], a, e);
      return r;
    }
    dE.exports = UM;
  });
  var hE = u((uk, vE) => {
    function VM(e) {
      return function (t, r, n) {
        for (var a = -1, i = Object(t), o = n(t), s = o.length; s--; ) {
          var c = o[e ? s : ++a];
          if (r(i[c], c, i) === !1) break;
        }
        return t;
      };
    }
    vE.exports = VM;
  });
  var gE = u((ck, EE) => {
    var WM = hE(),
      BM = WM();
    EE.exports = BM;
  });
  var Wo = u((lk, _E) => {
    var jM = gE(),
      HM = jr();
    function kM(e, t) {
      return e && jM(e, t, HM);
    }
    _E.exports = kM;
  });
  var IE = u((fk, yE) => {
    var KM = Gt();
    function zM(e, t) {
      return function (r, n) {
        if (r == null) return r;
        if (!KM(r)) return e(r, n);
        for (
          var a = r.length, i = t ? a : -1, o = Object(r);
          (t ? i-- : ++i < a) && n(o[i], i, o) !== !1;

        );
        return r;
      };
    }
    yE.exports = zM;
  });
  var Bo = u((dk, mE) => {
    var YM = Wo(),
      $M = IE(),
      QM = $M(YM);
    mE.exports = QM;
  });
  var OE = u((pk, TE) => {
    function ZM(e, t, r, n, a) {
      return (
        a(e, function (i, o, s) {
          r = n ? ((n = !1), i) : t(r, i, o, s);
        }),
        r
      );
    }
    TE.exports = ZM;
  });
  var SE = u((vk, bE) => {
    var JM = pE(),
      eD = Bo(),
      tD = wt(),
      rD = OE(),
      nD = Re();
    function iD(e, t, r) {
      var n = nD(e) ? JM : rD,
        a = arguments.length < 3;
      return n(e, tD(t, 4), r, a, eD);
    }
    bE.exports = iD;
  });
  var wE = u((hk, AE) => {
    var aD = No(),
      oD = wt(),
      sD = Po(),
      uD = Math.max,
      cD = Math.min;
    function lD(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var a = n - 1;
      return (
        r !== void 0 &&
          ((a = sD(r)), (a = r < 0 ? uD(n + a, 0) : cD(a, n - 1))),
        aD(e, oD(t, 3), a, !0)
      );
    }
    AE.exports = lD;
  });
  var CE = u((Ek, RE) => {
    var fD = Co(),
      dD = wE(),
      pD = fD(dD);
    RE.exports = pD;
  });
  var PE = u((si) => {
    "use strict";
    Object.defineProperty(si, "__esModule", { value: !0 });
    si.default = void 0;
    var vD = Object.prototype.hasOwnProperty;
    function NE(e, t) {
      return e === t
        ? e !== 0 || t !== 0 || 1 / e === 1 / t
        : e !== e && t !== t;
    }
    function hD(e, t) {
      if (NE(e, t)) return !0;
      if (
        typeof e != "object" ||
        e === null ||
        typeof t != "object" ||
        t === null
      )
        return !1;
      let r = Object.keys(e),
        n = Object.keys(t);
      if (r.length !== n.length) return !1;
      for (let a = 0; a < r.length; a++)
        if (!vD.call(t, r[a]) || !NE(e[r[a]], t[r[a]])) return !1;
      return !0;
    }
    var ED = hD;
    si.default = ED;
  });
  var $E = u((de) => {
    "use strict";
    var fi = Qe().default;
    Object.defineProperty(de, "__esModule", { value: !0 });
    de.cleanupHTMLElement = v1;
    de.clearAllStyles = p1;
    de.clearObjectCache = LD;
    de.getActionListProgress = E1;
    de.getAffectedElements = $o;
    de.getComputedStyle = WD;
    de.getDestinationValues = YD;
    de.getElementId = GD;
    de.getInstanceId = DD;
    de.getInstanceOrigin = HD;
    de.getItemConfigByKey = void 0;
    de.getMaxDurationItemIndex = YE;
    de.getNamespacedParameterId = y1;
    de.getRenderType = kE;
    de.getStyleProp = $D;
    de.mediaQueriesEqual = m1;
    de.observeStore = VD;
    de.reduceListToGroup = g1;
    de.reifyState = XD;
    de.renderHTMLElement = QD;
    Object.defineProperty(de, "shallowEqual", {
      enumerable: !0,
      get: function () {
        return XE.default;
      },
    });
    de.shouldAllowMediaQuery = I1;
    de.shouldNamespaceEventParameter = _1;
    de.stringifyTarget = T1;
    var Rt = fi(fE()),
      ko = fi(SE()),
      Ho = fi(CE()),
      qE = nr(),
      Vt = Xe(),
      XE = fi(PE()),
      gD = Do(),
      pt = Vo(),
      De = ti(),
      {
        BACKGROUND: _D,
        TRANSFORM: yD,
        TRANSLATE_3D: ID,
        SCALE_3D: mD,
        ROTATE_X: TD,
        ROTATE_Y: OD,
        ROTATE_Z: bD,
        SKEW: SD,
        PRESERVE_3D: AD,
        FLEX: wD,
        OPACITY: ci,
        FILTER: Yr,
        FONT_VARIATION_SETTINGS: $r,
        WIDTH: ft,
        HEIGHT: dt,
        BACKGROUND_COLOR: UE,
        BORDER_COLOR: RD,
        COLOR: CD,
        CHILDREN: xE,
        IMMEDIATE_CHILDREN: ND,
        SIBLINGS: LE,
        PARENT: PD,
        DISPLAY: li,
        WILL_CHANGE: pr,
        AUTO: Ct,
        COMMA_DELIMITER: Qr,
        COLON_DELIMITER: qD,
        BAR_DELIMITER: jo,
        RENDER_TRANSFORM: VE,
        RENDER_GENERAL: Ko,
        RENDER_STYLE: zo,
        RENDER_PLUGIN: WE,
      } = Vt.IX2EngineConstants,
      {
        TRANSFORM_MOVE: vr,
        TRANSFORM_SCALE: hr,
        TRANSFORM_ROTATE: Er,
        TRANSFORM_SKEW: Zr,
        STYLE_OPACITY: BE,
        STYLE_FILTER: Jr,
        STYLE_FONT_VARIATION: en,
        STYLE_SIZE: gr,
        STYLE_BACKGROUND_COLOR: _r,
        STYLE_BORDER: yr,
        STYLE_TEXT_COLOR: Ir,
        GENERAL_DISPLAY: di,
        OBJECT_VALUE: xD,
      } = Vt.ActionTypeConsts,
      jE = (e) => e.trim(),
      Yo = Object.freeze({ [_r]: UE, [yr]: RD, [Ir]: CD }),
      HE = Object.freeze({
        [De.TRANSFORM_PREFIXED]: yD,
        [UE]: _D,
        [ci]: ci,
        [Yr]: Yr,
        [ft]: ft,
        [dt]: dt,
        [$r]: $r,
      }),
      ui = new Map();
    function LD() {
      ui.clear();
    }
    var MD = 1;
    function DD() {
      return "i" + MD++;
    }
    var FD = 1;
    function GD(e, t) {
      for (let r in e) {
        let n = e[r];
        if (n && n.ref === t) return n.id;
      }
      return "e" + FD++;
    }
    function XD({ events: e, actionLists: t, site: r } = {}) {
      let n = (0, ko.default)(
          e,
          (o, s) => {
            let { eventTypeId: c } = s;
            return o[c] || (o[c] = {}), (o[c][s.id] = s), o;
          },
          {}
        ),
        a = r && r.mediaQueries,
        i = [];
      return (
        a
          ? (i = a.map((o) => o.key))
          : ((a = []), console.warn("IX2 missing mediaQueries in site data")),
        {
          ixData: {
            events: e,
            actionLists: t,
            eventTypeMap: n,
            mediaQueries: a,
            mediaQueryKeys: i,
          },
        }
      );
    }
    var UD = (e, t) => e === t;
    function VD({ store: e, select: t, onChange: r, comparator: n = UD }) {
      let { getState: a, subscribe: i } = e,
        o = i(c),
        s = t(a());
      function c() {
        let d = t(a());
        if (d == null) {
          o();
          return;
        }
        n(d, s) || ((s = d), r(s, e));
      }
      return o;
    }
    function ME(e) {
      let t = typeof e;
      if (t === "string") return { id: e };
      if (e != null && t === "object") {
        let {
          id: r,
          objectId: n,
          selector: a,
          selectorGuids: i,
          appliesTo: o,
          useEventTarget: s,
        } = e;
        return {
          id: r,
          objectId: n,
          selector: a,
          selectorGuids: i,
          appliesTo: o,
          useEventTarget: s,
        };
      }
      return {};
    }
    function $o({
      config: e,
      event: t,
      eventTarget: r,
      elementRoot: n,
      elementApi: a,
    }) {
      var i, o, s;
      if (!a) throw new Error("IX2 missing elementApi");
      let { targets: c } = e;
      if (Array.isArray(c) && c.length > 0)
        return c.reduce(
          (G, V) =>
            G.concat(
              $o({
                config: { target: V },
                event: t,
                eventTarget: r,
                elementRoot: n,
                elementApi: a,
              })
            ),
          []
        );
      let {
          getValidDocument: d,
          getQuerySelector: v,
          queryDocument: p,
          getChildElements: h,
          getSiblingElements: I,
          matchSelector: m,
          elementContains: T,
          isSiblingNode: L,
        } = a,
        { target: C } = e;
      if (!C) return [];
      let {
        id: N,
        objectId: A,
        selector: M,
        selectorGuids: q,
        appliesTo: x,
        useEventTarget: U,
      } = ME(C);
      if (A) return [ui.has(A) ? ui.get(A) : ui.set(A, {}).get(A)];
      if (x === Vt.EventAppliesTo.PAGE) {
        let G = d(N);
        return G ? [G] : [];
      }
      let k =
          ((i =
            t == null ||
            (o = t.action) === null ||
            o === void 0 ||
            (s = o.config) === null ||
            s === void 0
              ? void 0
              : s.affectedElements) !== null && i !== void 0
            ? i
            : {})[N || M] || {},
        re = !!(k.id || k.selector),
        Z,
        X,
        b,
        D = t && v(ME(t.target));
      if (
        (re
          ? ((Z = k.limitAffectedElements), (X = D), (b = v(k)))
          : (X = b = v({ id: N, selector: M, selectorGuids: q })),
        t && U)
      ) {
        let G = r && (b || U === !0) ? [r] : p(D);
        if (b) {
          if (U === PD) return p(b).filter((V) => G.some(($) => T(V, $)));
          if (U === xE) return p(b).filter((V) => G.some(($) => T($, V)));
          if (U === LE) return p(b).filter((V) => G.some(($) => L($, V)));
        }
        return G;
      }
      return X == null || b == null
        ? []
        : De.IS_BROWSER_ENV && n
        ? p(b).filter((G) => n.contains(G))
        : Z === xE
        ? p(X, b)
        : Z === ND
        ? h(p(X)).filter(m(b))
        : Z === LE
        ? I(p(X)).filter(m(b))
        : p(b);
    }
    function WD({ element: e, actionItem: t }) {
      if (!De.IS_BROWSER_ENV) return {};
      let { actionTypeId: r } = t;
      switch (r) {
        case gr:
        case _r:
        case yr:
        case Ir:
        case di:
          return window.getComputedStyle(e);
        default:
          return {};
      }
    }
    var DE = /px/,
      BD = (e, t) =>
        t.reduce(
          (r, n) => (r[n.type] == null && (r[n.type] = ZD[n.type]), r),
          e || {}
        ),
      jD = (e, t) =>
        t.reduce(
          (r, n) => (
            r[n.type] == null &&
              (r[n.type] = JD[n.type] || n.defaultValue || 0),
            r
          ),
          e || {}
        );
    function HD(e, t = {}, r = {}, n, a) {
      let { getStyle: i } = a,
        { actionTypeId: o } = n;
      if ((0, pt.isPluginType)(o)) return (0, pt.getPluginOrigin)(o)(t[o], n);
      switch (n.actionTypeId) {
        case vr:
        case hr:
        case Er:
        case Zr:
          return t[n.actionTypeId] || Qo[n.actionTypeId];
        case Jr:
          return BD(t[n.actionTypeId], n.config.filters);
        case en:
          return jD(t[n.actionTypeId], n.config.fontVariations);
        case BE:
          return { value: (0, Rt.default)(parseFloat(i(e, ci)), 1) };
        case gr: {
          let s = i(e, ft),
            c = i(e, dt),
            d,
            v;
          return (
            n.config.widthUnit === Ct
              ? (d = DE.test(s) ? parseFloat(s) : parseFloat(r.width))
              : (d = (0, Rt.default)(parseFloat(s), parseFloat(r.width))),
            n.config.heightUnit === Ct
              ? (v = DE.test(c) ? parseFloat(c) : parseFloat(r.height))
              : (v = (0, Rt.default)(parseFloat(c), parseFloat(r.height))),
            { widthValue: d, heightValue: v }
          );
        }
        case _r:
        case yr:
        case Ir:
          return l1({
            element: e,
            actionTypeId: n.actionTypeId,
            computedStyle: r,
            getStyle: i,
          });
        case di:
          return { value: (0, Rt.default)(i(e, li), r.display) };
        case xD:
          return t[n.actionTypeId] || { value: 0 };
        default:
          return;
      }
    }
    var kD = (e, t) => (t && (e[t.type] = t.value || 0), e),
      KD = (e, t) => (t && (e[t.type] = t.value || 0), e),
      zD = (e, t, r) => {
        if ((0, pt.isPluginType)(e)) return (0, pt.getPluginConfig)(e)(r, t);
        switch (e) {
          case Jr: {
            let n = (0, Ho.default)(r.filters, ({ type: a }) => a === t);
            return n ? n.value : 0;
          }
          case en: {
            let n = (0, Ho.default)(r.fontVariations, ({ type: a }) => a === t);
            return n ? n.value : 0;
          }
          default:
            return r[t];
        }
      };
    de.getItemConfigByKey = zD;
    function YD({ element: e, actionItem: t, elementApi: r }) {
      if ((0, pt.isPluginType)(t.actionTypeId))
        return (0, pt.getPluginDestination)(t.actionTypeId)(t.config);
      switch (t.actionTypeId) {
        case vr:
        case hr:
        case Er:
        case Zr: {
          let { xValue: n, yValue: a, zValue: i } = t.config;
          return { xValue: n, yValue: a, zValue: i };
        }
        case gr: {
          let { getStyle: n, setStyle: a, getProperty: i } = r,
            { widthUnit: o, heightUnit: s } = t.config,
            { widthValue: c, heightValue: d } = t.config;
          if (!De.IS_BROWSER_ENV) return { widthValue: c, heightValue: d };
          if (o === Ct) {
            let v = n(e, ft);
            a(e, ft, ""), (c = i(e, "offsetWidth")), a(e, ft, v);
          }
          if (s === Ct) {
            let v = n(e, dt);
            a(e, dt, ""), (d = i(e, "offsetHeight")), a(e, dt, v);
          }
          return { widthValue: c, heightValue: d };
        }
        case _r:
        case yr:
        case Ir: {
          let { rValue: n, gValue: a, bValue: i, aValue: o } = t.config;
          return { rValue: n, gValue: a, bValue: i, aValue: o };
        }
        case Jr:
          return t.config.filters.reduce(kD, {});
        case en:
          return t.config.fontVariations.reduce(KD, {});
        default: {
          let { value: n } = t.config;
          return { value: n };
        }
      }
    }
    function kE(e) {
      if (/^TRANSFORM_/.test(e)) return VE;
      if (/^STYLE_/.test(e)) return zo;
      if (/^GENERAL_/.test(e)) return Ko;
      if (/^PLUGIN_/.test(e)) return WE;
    }
    function $D(e, t) {
      return e === zo ? t.replace("STYLE_", "").toLowerCase() : null;
    }
    function QD(e, t, r, n, a, i, o, s, c) {
      switch (s) {
        case VE:
          return r1(e, t, r, a, o);
        case zo:
          return f1(e, t, r, a, i, o);
        case Ko:
          return d1(e, a, o);
        case WE: {
          let { actionTypeId: d } = a;
          if ((0, pt.isPluginType)(d)) return (0, pt.renderPlugin)(d)(c, t, a);
        }
      }
    }
    var Qo = {
        [vr]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [hr]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
        [Er]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [Zr]: Object.freeze({ xValue: 0, yValue: 0 }),
      },
      ZD = Object.freeze({
        blur: 0,
        "hue-rotate": 0,
        invert: 0,
        grayscale: 0,
        saturate: 100,
        sepia: 0,
        contrast: 100,
        brightness: 100,
      }),
      JD = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 }),
      e1 = (e, t) => {
        let r = (0, Ho.default)(t.filters, ({ type: n }) => n === e);
        if (r && r.unit) return r.unit;
        switch (e) {
          case "blur":
            return "px";
          case "hue-rotate":
            return "deg";
          default:
            return "%";
        }
      },
      t1 = Object.keys(Qo);
    function r1(e, t, r, n, a) {
      let i = t1
          .map((s) => {
            let c = Qo[s],
              {
                xValue: d = c.xValue,
                yValue: v = c.yValue,
                zValue: p = c.zValue,
                xUnit: h = "",
                yUnit: I = "",
                zUnit: m = "",
              } = t[s] || {};
            switch (s) {
              case vr:
                return `${ID}(${d}${h}, ${v}${I}, ${p}${m})`;
              case hr:
                return `${mD}(${d}${h}, ${v}${I}, ${p}${m})`;
              case Er:
                return `${TD}(${d}${h}) ${OD}(${v}${I}) ${bD}(${p}${m})`;
              case Zr:
                return `${SD}(${d}${h}, ${v}${I})`;
              default:
                return "";
            }
          })
          .join(" "),
        { setStyle: o } = a;
      Wt(e, De.TRANSFORM_PREFIXED, a),
        o(e, De.TRANSFORM_PREFIXED, i),
        a1(n, r) && o(e, De.TRANSFORM_STYLE_PREFIXED, AD);
    }
    function n1(e, t, r, n) {
      let a = (0, ko.default)(t, (o, s, c) => `${o} ${c}(${s}${e1(c, r)})`, ""),
        { setStyle: i } = n;
      Wt(e, Yr, n), i(e, Yr, a);
    }
    function i1(e, t, r, n) {
      let a = (0, ko.default)(
          t,
          (o, s, c) => (o.push(`"${c}" ${s}`), o),
          []
        ).join(", "),
        { setStyle: i } = n;
      Wt(e, $r, n), i(e, $r, a);
    }
    function a1({ actionTypeId: e }, { xValue: t, yValue: r, zValue: n }) {
      return (
        (e === vr && n !== void 0) ||
        (e === hr && n !== void 0) ||
        (e === Er && (t !== void 0 || r !== void 0))
      );
    }
    var o1 = "\\(([^)]+)\\)",
      s1 = /^rgb/,
      u1 = RegExp(`rgba?${o1}`);
    function c1(e, t) {
      let r = e.exec(t);
      return r ? r[1] : "";
    }
    function l1({
      element: e,
      actionTypeId: t,
      computedStyle: r,
      getStyle: n,
    }) {
      let a = Yo[t],
        i = n(e, a),
        o = s1.test(i) ? i : r[a],
        s = c1(u1, o).split(Qr);
      return {
        rValue: (0, Rt.default)(parseInt(s[0], 10), 255),
        gValue: (0, Rt.default)(parseInt(s[1], 10), 255),
        bValue: (0, Rt.default)(parseInt(s[2], 10), 255),
        aValue: (0, Rt.default)(parseFloat(s[3]), 1),
      };
    }
    function f1(e, t, r, n, a, i) {
      let { setStyle: o } = i;
      switch (n.actionTypeId) {
        case gr: {
          let { widthUnit: s = "", heightUnit: c = "" } = n.config,
            { widthValue: d, heightValue: v } = r;
          d !== void 0 &&
            (s === Ct && (s = "px"), Wt(e, ft, i), o(e, ft, d + s)),
            v !== void 0 &&
              (c === Ct && (c = "px"), Wt(e, dt, i), o(e, dt, v + c));
          break;
        }
        case Jr: {
          n1(e, r, n.config, i);
          break;
        }
        case en: {
          i1(e, r, n.config, i);
          break;
        }
        case _r:
        case yr:
        case Ir: {
          let s = Yo[n.actionTypeId],
            c = Math.round(r.rValue),
            d = Math.round(r.gValue),
            v = Math.round(r.bValue),
            p = r.aValue;
          Wt(e, s, i),
            o(
              e,
              s,
              p >= 1 ? `rgb(${c},${d},${v})` : `rgba(${c},${d},${v},${p})`
            );
          break;
        }
        default: {
          let { unit: s = "" } = n.config;
          Wt(e, a, i), o(e, a, r.value + s);
          break;
        }
      }
    }
    function d1(e, t, r) {
      let { setStyle: n } = r;
      switch (t.actionTypeId) {
        case di: {
          let { value: a } = t.config;
          a === wD && De.IS_BROWSER_ENV
            ? n(e, li, De.FLEX_PREFIXED)
            : n(e, li, a);
          return;
        }
      }
    }
    function Wt(e, t, r) {
      if (!De.IS_BROWSER_ENV) return;
      let n = HE[t];
      if (!n) return;
      let { getStyle: a, setStyle: i } = r,
        o = a(e, pr);
      if (!o) {
        i(e, pr, n);
        return;
      }
      let s = o.split(Qr).map(jE);
      s.indexOf(n) === -1 && i(e, pr, s.concat(n).join(Qr));
    }
    function KE(e, t, r) {
      if (!De.IS_BROWSER_ENV) return;
      let n = HE[t];
      if (!n) return;
      let { getStyle: a, setStyle: i } = r,
        o = a(e, pr);
      !o ||
        o.indexOf(n) === -1 ||
        i(
          e,
          pr,
          o
            .split(Qr)
            .map(jE)
            .filter((s) => s !== n)
            .join(Qr)
        );
    }
    function p1({ store: e, elementApi: t }) {
      let { ixData: r } = e.getState(),
        { events: n = {}, actionLists: a = {} } = r;
      Object.keys(n).forEach((i) => {
        let o = n[i],
          { config: s } = o.action,
          { actionListId: c } = s,
          d = a[c];
        d && FE({ actionList: d, event: o, elementApi: t });
      }),
        Object.keys(a).forEach((i) => {
          FE({ actionList: a[i], elementApi: t });
        });
    }
    function FE({ actionList: e = {}, event: t, elementApi: r }) {
      let { actionItemGroups: n, continuousParameterGroups: a } = e;
      n &&
        n.forEach((i) => {
          GE({ actionGroup: i, event: t, elementApi: r });
        }),
        a &&
          a.forEach((i) => {
            let { continuousActionGroups: o } = i;
            o.forEach((s) => {
              GE({ actionGroup: s, event: t, elementApi: r });
            });
          });
    }
    function GE({ actionGroup: e, event: t, elementApi: r }) {
      let { actionItems: n } = e;
      n.forEach((a) => {
        let { actionTypeId: i, config: o } = a,
          s;
        (0, pt.isPluginType)(i)
          ? (s = (c) => (0, pt.clearPlugin)(i)(c, a))
          : (s = zE({ effect: h1, actionTypeId: i, elementApi: r })),
          $o({ config: o, event: t, elementApi: r }).forEach(s);
      });
    }
    function v1(e, t, r) {
      let { setStyle: n, getStyle: a } = r,
        { actionTypeId: i } = t;
      if (i === gr) {
        let { config: o } = t;
        o.widthUnit === Ct && n(e, ft, ""), o.heightUnit === Ct && n(e, dt, "");
      }
      a(e, pr) && zE({ effect: KE, actionTypeId: i, elementApi: r })(e);
    }
    var zE =
      ({ effect: e, actionTypeId: t, elementApi: r }) =>
      (n) => {
        switch (t) {
          case vr:
          case hr:
          case Er:
          case Zr:
            e(n, De.TRANSFORM_PREFIXED, r);
            break;
          case Jr:
            e(n, Yr, r);
            break;
          case en:
            e(n, $r, r);
            break;
          case BE:
            e(n, ci, r);
            break;
          case gr:
            e(n, ft, r), e(n, dt, r);
            break;
          case _r:
          case yr:
          case Ir:
            e(n, Yo[t], r);
            break;
          case di:
            e(n, li, r);
            break;
        }
      };
    function h1(e, t, r) {
      let { setStyle: n } = r;
      KE(e, t, r),
        n(e, t, ""),
        t === De.TRANSFORM_PREFIXED && n(e, De.TRANSFORM_STYLE_PREFIXED, "");
    }
    function YE(e) {
      let t = 0,
        r = 0;
      return (
        e.forEach((n, a) => {
          let { config: i } = n,
            o = i.delay + i.duration;
          o >= t && ((t = o), (r = a));
        }),
        r
      );
    }
    function E1(e, t) {
      let { actionItemGroups: r, useFirstGroupAsInitialState: n } = e,
        { actionItem: a, verboseTimeElapsed: i = 0 } = t,
        o = 0,
        s = 0;
      return (
        r.forEach((c, d) => {
          if (n && d === 0) return;
          let { actionItems: v } = c,
            p = v[YE(v)],
            { config: h, actionTypeId: I } = p;
          a.id === p.id && (s = o + i);
          let m = kE(I) === Ko ? 0 : h.duration;
          o += h.delay + m;
        }),
        o > 0 ? (0, gD.optimizeFloat)(s / o) : 0
      );
    }
    function g1({ actionList: e, actionItemId: t, rawData: r }) {
      let { actionItemGroups: n, continuousParameterGroups: a } = e,
        i = [],
        o = (s) => (
          i.push((0, qE.mergeIn)(s, ["config"], { delay: 0, duration: 0 })),
          s.id === t
        );
      return (
        n && n.some(({ actionItems: s }) => s.some(o)),
        a &&
          a.some((s) => {
            let { continuousActionGroups: c } = s;
            return c.some(({ actionItems: d }) => d.some(o));
          }),
        (0, qE.setIn)(r, ["actionLists"], {
          [e.id]: { id: e.id, actionItemGroups: [{ actionItems: i }] },
        })
      );
    }
    function _1(e, { basedOn: t }) {
      return (
        (e === Vt.EventTypeConsts.SCROLLING_IN_VIEW &&
          (t === Vt.EventBasedOn.ELEMENT || t == null)) ||
        (e === Vt.EventTypeConsts.MOUSE_MOVE && t === Vt.EventBasedOn.ELEMENT)
      );
    }
    function y1(e, t) {
      return e + qD + t;
    }
    function I1(e, t) {
      return t == null ? !0 : e.indexOf(t) !== -1;
    }
    function m1(e, t) {
      return (0, XE.default)(e && e.sort(), t && t.sort());
    }
    function T1(e) {
      if (typeof e == "string") return e;
      if (e.pluginElement && e.objectId)
        return e.pluginElement + jo + e.objectId;
      if (e.objectId) return e.objectId;
      let { id: t = "", selector: r = "", useEventTarget: n = "" } = e;
      return t + jo + r + jo + n;
    }
  });
  var Bt = u((Fe) => {
    "use strict";
    var mr = Lt().default;
    Object.defineProperty(Fe, "__esModule", { value: !0 });
    Fe.IX2VanillaUtils =
      Fe.IX2VanillaPlugins =
      Fe.IX2ElementsReducer =
      Fe.IX2Easings =
      Fe.IX2EasingUtils =
      Fe.IX2BrowserSupport =
        void 0;
    var O1 = mr(ti());
    Fe.IX2BrowserSupport = O1;
    var b1 = mr(Lo());
    Fe.IX2Easings = b1;
    var S1 = mr(Do());
    Fe.IX2EasingUtils = S1;
    var A1 = mr(rE());
    Fe.IX2ElementsReducer = A1;
    var w1 = mr(Vo());
    Fe.IX2VanillaPlugins = w1;
    var R1 = mr($E());
    Fe.IX2VanillaUtils = R1;
  });
  var eg = u((vi) => {
    "use strict";
    Object.defineProperty(vi, "__esModule", { value: !0 });
    vi.ixInstances = void 0;
    var QE = Xe(),
      ZE = Bt(),
      Tr = nr(),
      {
        IX2_RAW_DATA_IMPORTED: C1,
        IX2_SESSION_STOPPED: N1,
        IX2_INSTANCE_ADDED: P1,
        IX2_INSTANCE_STARTED: q1,
        IX2_INSTANCE_REMOVED: x1,
        IX2_ANIMATION_FRAME_CHANGED: L1,
      } = QE.IX2EngineActionTypes,
      {
        optimizeFloat: pi,
        applyEasing: JE,
        createBezierEasing: M1,
      } = ZE.IX2EasingUtils,
      { RENDER_GENERAL: D1 } = QE.IX2EngineConstants,
      {
        getItemConfigByKey: Zo,
        getRenderType: F1,
        getStyleProp: G1,
      } = ZE.IX2VanillaUtils,
      X1 = (e, t) => {
        let {
            position: r,
            parameterId: n,
            actionGroups: a,
            destinationKeys: i,
            smoothing: o,
            restingValue: s,
            actionTypeId: c,
            customEasingFn: d,
            skipMotion: v,
            skipToValue: p,
          } = e,
          { parameters: h } = t.payload,
          I = Math.max(1 - o, 0.01),
          m = h[n];
        m == null && ((I = 1), (m = s));
        let T = Math.max(m, 0) || 0,
          L = pi(T - r),
          C = v ? p : pi(r + L * I),
          N = C * 100;
        if (C === r && e.current) return e;
        let A, M, q, x;
        for (let H = 0, { length: k } = a; H < k; H++) {
          let { keyframe: re, actionItems: Z } = a[H];
          if ((H === 0 && (A = Z[0]), N >= re)) {
            A = Z[0];
            let X = a[H + 1],
              b = X && N !== re;
            (M = b ? X.actionItems[0] : null),
              b && ((q = re / 100), (x = (X.keyframe - re) / 100));
          }
        }
        let U = {};
        if (A && !M)
          for (let H = 0, { length: k } = i; H < k; H++) {
            let re = i[H];
            U[re] = Zo(c, re, A.config);
          }
        else if (A && M && q !== void 0 && x !== void 0) {
          let H = (C - q) / x,
            k = A.config.easing,
            re = JE(k, H, d);
          for (let Z = 0, { length: X } = i; Z < X; Z++) {
            let b = i[Z],
              D = Zo(c, b, A.config),
              $ = (Zo(c, b, M.config) - D) * re + D;
            U[b] = $;
          }
        }
        return (0, Tr.merge)(e, { position: C, current: U });
      },
      U1 = (e, t) => {
        let {
            active: r,
            origin: n,
            start: a,
            immediate: i,
            renderType: o,
            verbose: s,
            actionItem: c,
            destination: d,
            destinationKeys: v,
            pluginDuration: p,
            instanceDelay: h,
            customEasingFn: I,
            skipMotion: m,
          } = e,
          T = c.config.easing,
          { duration: L, delay: C } = c.config;
        p != null && (L = p),
          (C = h ?? C),
          o === D1 ? (L = 0) : (i || m) && (L = C = 0);
        let { now: N } = t.payload;
        if (r && n) {
          let A = N - (a + C);
          if (s) {
            let H = N - a,
              k = L + C,
              re = pi(Math.min(Math.max(0, H / k), 1));
            e = (0, Tr.set)(e, "verboseTimeElapsed", k * re);
          }
          if (A < 0) return e;
          let M = pi(Math.min(Math.max(0, A / L), 1)),
            q = JE(T, M, I),
            x = {},
            U = null;
          return (
            v.length &&
              (U = v.reduce((H, k) => {
                let re = d[k],
                  Z = parseFloat(n[k]) || 0,
                  b = (parseFloat(re) - Z) * q + Z;
                return (H[k] = b), H;
              }, {})),
            (x.current = U),
            (x.position = M),
            M === 1 && ((x.active = !1), (x.complete = !0)),
            (0, Tr.merge)(e, x)
          );
        }
        return e;
      },
      V1 = (e = Object.freeze({}), t) => {
        switch (t.type) {
          case C1:
            return t.payload.ixInstances || Object.freeze({});
          case N1:
            return Object.freeze({});
          case P1: {
            let {
                instanceId: r,
                elementId: n,
                actionItem: a,
                eventId: i,
                eventTarget: o,
                eventStateKey: s,
                actionListId: c,
                groupIndex: d,
                isCarrier: v,
                origin: p,
                destination: h,
                immediate: I,
                verbose: m,
                continuous: T,
                parameterId: L,
                actionGroups: C,
                smoothing: N,
                restingValue: A,
                pluginInstance: M,
                pluginDuration: q,
                instanceDelay: x,
                skipMotion: U,
                skipToValue: H,
              } = t.payload,
              { actionTypeId: k } = a,
              re = F1(k),
              Z = G1(re, k),
              X = Object.keys(h).filter(
                (D) => h[D] != null && typeof h[D] != "string"
              ),
              { easing: b } = a.config;
            return (0, Tr.set)(e, r, {
              id: r,
              elementId: n,
              active: !1,
              position: 0,
              start: 0,
              origin: p,
              destination: h,
              destinationKeys: X,
              immediate: I,
              verbose: m,
              current: null,
              actionItem: a,
              actionTypeId: k,
              eventId: i,
              eventTarget: o,
              eventStateKey: s,
              actionListId: c,
              groupIndex: d,
              renderType: re,
              isCarrier: v,
              styleProp: Z,
              continuous: T,
              parameterId: L,
              actionGroups: C,
              smoothing: N,
              restingValue: A,
              pluginInstance: M,
              pluginDuration: q,
              instanceDelay: x,
              skipMotion: U,
              skipToValue: H,
              customEasingFn:
                Array.isArray(b) && b.length === 4 ? M1(b) : void 0,
            });
          }
          case q1: {
            let { instanceId: r, time: n } = t.payload;
            return (0, Tr.mergeIn)(e, [r], {
              active: !0,
              complete: !1,
              start: n,
            });
          }
          case x1: {
            let { instanceId: r } = t.payload;
            if (!e[r]) return e;
            let n = {},
              a = Object.keys(e),
              { length: i } = a;
            for (let o = 0; o < i; o++) {
              let s = a[o];
              s !== r && (n[s] = e[s]);
            }
            return n;
          }
          case L1: {
            let r = e,
              n = Object.keys(e),
              { length: a } = n;
            for (let i = 0; i < a; i++) {
              let o = n[i],
                s = e[o],
                c = s.continuous ? X1 : U1;
              r = (0, Tr.set)(r, o, c(s, t));
            }
            return r;
          }
          default:
            return e;
        }
      };
    vi.ixInstances = V1;
  });
  var tg = u((hi) => {
    "use strict";
    Object.defineProperty(hi, "__esModule", { value: !0 });
    hi.ixParameters = void 0;
    var W1 = Xe(),
      {
        IX2_RAW_DATA_IMPORTED: B1,
        IX2_SESSION_STOPPED: j1,
        IX2_PARAMETER_CHANGED: H1,
      } = W1.IX2EngineActionTypes,
      k1 = (e = {}, t) => {
        switch (t.type) {
          case B1:
            return t.payload.ixParameters || {};
          case j1:
            return {};
          case H1: {
            let { key: r, value: n } = t.payload;
            return (e[r] = n), e;
          }
          default:
            return e;
        }
      };
    hi.ixParameters = k1;
  });
  var rg = u((Ei) => {
    "use strict";
    Object.defineProperty(Ei, "__esModule", { value: !0 });
    Ei.default = void 0;
    var K1 = $a(),
      z1 = If(),
      Y1 = Xf(),
      $1 = Vf(),
      Q1 = Bt(),
      Z1 = eg(),
      J1 = tg(),
      { ixElements: eF } = Q1.IX2ElementsReducer,
      tF = (0, K1.combineReducers)({
        ixData: z1.ixData,
        ixRequest: Y1.ixRequest,
        ixSession: $1.ixSession,
        ixElements: eF,
        ixInstances: Z1.ixInstances,
        ixParameters: J1.ixParameters,
      });
    Ei.default = tF;
  });
  var ng = u((Ok, tn) => {
    function rF(e, t) {
      if (e == null) return {};
      var r = {},
        n = Object.keys(e),
        a,
        i;
      for (i = 0; i < n.length; i++)
        (a = n[i]), !(t.indexOf(a) >= 0) && (r[a] = e[a]);
      return r;
    }
    (tn.exports = rF),
      (tn.exports.__esModule = !0),
      (tn.exports.default = tn.exports);
  });
  var ag = u((bk, ig) => {
    var nF = St(),
      iF = Re(),
      aF = _t(),
      oF = "[object String]";
    function sF(e) {
      return typeof e == "string" || (!iF(e) && aF(e) && nF(e) == oF);
    }
    ig.exports = sF;
  });
  var sg = u((Sk, og) => {
    var uF = Ro(),
      cF = uF("length");
    og.exports = cF;
  });
  var cg = u((Ak, ug) => {
    var lF = "\\ud800-\\udfff",
      fF = "\\u0300-\\u036f",
      dF = "\\ufe20-\\ufe2f",
      pF = "\\u20d0-\\u20ff",
      vF = fF + dF + pF,
      hF = "\\ufe0e\\ufe0f",
      EF = "\\u200d",
      gF = RegExp("[" + EF + lF + vF + hF + "]");
    function _F(e) {
      return gF.test(e);
    }
    ug.exports = _F;
  });
  var _g = u((wk, gg) => {
    var fg = "\\ud800-\\udfff",
      yF = "\\u0300-\\u036f",
      IF = "\\ufe20-\\ufe2f",
      mF = "\\u20d0-\\u20ff",
      TF = yF + IF + mF,
      OF = "\\ufe0e\\ufe0f",
      bF = "[" + fg + "]",
      Jo = "[" + TF + "]",
      es = "\\ud83c[\\udffb-\\udfff]",
      SF = "(?:" + Jo + "|" + es + ")",
      dg = "[^" + fg + "]",
      pg = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      vg = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      AF = "\\u200d",
      hg = SF + "?",
      Eg = "[" + OF + "]?",
      wF = "(?:" + AF + "(?:" + [dg, pg, vg].join("|") + ")" + Eg + hg + ")*",
      RF = Eg + hg + wF,
      CF = "(?:" + [dg + Jo + "?", Jo, pg, vg, bF].join("|") + ")",
      lg = RegExp(es + "(?=" + es + ")|" + CF + RF, "g");
    function NF(e) {
      for (var t = (lg.lastIndex = 0); lg.test(e); ) ++t;
      return t;
    }
    gg.exports = NF;
  });
  var Ig = u((Rk, yg) => {
    var PF = sg(),
      qF = cg(),
      xF = _g();
    function LF(e) {
      return qF(e) ? xF(e) : PF(e);
    }
    yg.exports = LF;
  });
  var Tg = u((Ck, mg) => {
    var MF = kn(),
      DF = Kn(),
      FF = Gt(),
      GF = ag(),
      XF = Ig(),
      UF = "[object Map]",
      VF = "[object Set]";
    function WF(e) {
      if (e == null) return 0;
      if (FF(e)) return GF(e) ? XF(e) : e.length;
      var t = DF(e);
      return t == UF || t == VF ? e.size : MF(e).length;
    }
    mg.exports = WF;
  });
  var bg = u((Nk, Og) => {
    var BF = "Expected a function";
    function jF(e) {
      if (typeof e != "function") throw new TypeError(BF);
      return function () {
        var t = arguments;
        switch (t.length) {
          case 0:
            return !e.call(this);
          case 1:
            return !e.call(this, t[0]);
          case 2:
            return !e.call(this, t[0], t[1]);
          case 3:
            return !e.call(this, t[0], t[1], t[2]);
        }
        return !e.apply(this, t);
      };
    }
    Og.exports = jF;
  });
  var ts = u((Pk, Sg) => {
    var HF = At(),
      kF = (function () {
        try {
          var e = HF(Object, "defineProperty");
          return e({}, "", {}), e;
        } catch {}
      })();
    Sg.exports = kF;
  });
  var rs = u((qk, wg) => {
    var Ag = ts();
    function KF(e, t, r) {
      t == "__proto__" && Ag
        ? Ag(e, t, { configurable: !0, enumerable: !0, value: r, writable: !0 })
        : (e[t] = r);
    }
    wg.exports = KF;
  });
  var Cg = u((xk, Rg) => {
    var zF = rs(),
      YF = Dn(),
      $F = Object.prototype,
      QF = $F.hasOwnProperty;
    function ZF(e, t, r) {
      var n = e[t];
      (!(QF.call(e, t) && YF(n, r)) || (r === void 0 && !(t in e))) &&
        zF(e, t, r);
    }
    Rg.exports = ZF;
  });
  var qg = u((Lk, Pg) => {
    var JF = Cg(),
      e2 = kr(),
      t2 = Wn(),
      Ng = lt(),
      r2 = fr();
    function n2(e, t, r, n) {
      if (!Ng(e)) return e;
      t = e2(t, e);
      for (var a = -1, i = t.length, o = i - 1, s = e; s != null && ++a < i; ) {
        var c = r2(t[a]),
          d = r;
        if (c === "__proto__" || c === "constructor" || c === "prototype")
          return e;
        if (a != o) {
          var v = s[c];
          (d = n ? n(v, c, s) : void 0),
            d === void 0 && (d = Ng(v) ? v : t2(t[a + 1]) ? [] : {});
        }
        JF(s, c, d), (s = s[c]);
      }
      return e;
    }
    Pg.exports = n2;
  });
  var Lg = u((Mk, xg) => {
    var i2 = $n(),
      a2 = qg(),
      o2 = kr();
    function s2(e, t, r) {
      for (var n = -1, a = t.length, i = {}; ++n < a; ) {
        var o = t[n],
          s = i2(e, o);
        r(s, o) && a2(i, o2(o, e), s);
      }
      return i;
    }
    xg.exports = s2;
  });
  var Dg = u((Dk, Mg) => {
    var u2 = Un(),
      c2 = Fa(),
      l2 = po(),
      f2 = fo(),
      d2 = Object.getOwnPropertySymbols,
      p2 = d2
        ? function (e) {
            for (var t = []; e; ) u2(t, l2(e)), (e = c2(e));
            return t;
          }
        : f2;
    Mg.exports = p2;
  });
  var Gg = u((Fk, Fg) => {
    function v2(e) {
      var t = [];
      if (e != null) for (var r in Object(e)) t.push(r);
      return t;
    }
    Fg.exports = v2;
  });
  var Ug = u((Gk, Xg) => {
    var h2 = lt(),
      E2 = Hn(),
      g2 = Gg(),
      _2 = Object.prototype,
      y2 = _2.hasOwnProperty;
    function I2(e) {
      if (!h2(e)) return g2(e);
      var t = E2(e),
        r = [];
      for (var n in e)
        (n == "constructor" && (t || !y2.call(e, n))) || r.push(n);
      return r;
    }
    Xg.exports = I2;
  });
  var Wg = u((Xk, Vg) => {
    var m2 = ho(),
      T2 = Ug(),
      O2 = Gt();
    function b2(e) {
      return O2(e) ? m2(e, !0) : T2(e);
    }
    Vg.exports = b2;
  });
  var jg = u((Uk, Bg) => {
    var S2 = lo(),
      A2 = Dg(),
      w2 = Wg();
    function R2(e) {
      return S2(e, w2, A2);
    }
    Bg.exports = R2;
  });
  var kg = u((Vk, Hg) => {
    var C2 = wo(),
      N2 = wt(),
      P2 = Lg(),
      q2 = jg();
    function x2(e, t) {
      if (e == null) return {};
      var r = C2(q2(e), function (n) {
        return [n];
      });
      return (
        (t = N2(t)),
        P2(e, r, function (n, a) {
          return t(n, a[0]);
        })
      );
    }
    Hg.exports = x2;
  });
  var zg = u((Wk, Kg) => {
    var L2 = wt(),
      M2 = bg(),
      D2 = kg();
    function F2(e, t) {
      return D2(e, M2(L2(t)));
    }
    Kg.exports = F2;
  });
  var $g = u((Bk, Yg) => {
    var G2 = kn(),
      X2 = Kn(),
      U2 = Ur(),
      V2 = Re(),
      W2 = Gt(),
      B2 = Vn(),
      j2 = Hn(),
      H2 = jn(),
      k2 = "[object Map]",
      K2 = "[object Set]",
      z2 = Object.prototype,
      Y2 = z2.hasOwnProperty;
    function $2(e) {
      if (e == null) return !0;
      if (
        W2(e) &&
        (V2(e) ||
          typeof e == "string" ||
          typeof e.splice == "function" ||
          B2(e) ||
          H2(e) ||
          U2(e))
      )
        return !e.length;
      var t = X2(e);
      if (t == k2 || t == K2) return !e.size;
      if (j2(e)) return !G2(e).length;
      for (var r in e) if (Y2.call(e, r)) return !1;
      return !0;
    }
    Yg.exports = $2;
  });
  var Zg = u((jk, Qg) => {
    var Q2 = rs(),
      Z2 = Wo(),
      J2 = wt();
    function eG(e, t) {
      var r = {};
      return (
        (t = J2(t, 3)),
        Z2(e, function (n, a, i) {
          Q2(r, a, t(n, a, i));
        }),
        r
      );
    }
    Qg.exports = eG;
  });
  var e_ = u((Hk, Jg) => {
    function tG(e, t) {
      for (
        var r = -1, n = e == null ? 0 : e.length;
        ++r < n && t(e[r], r, e) !== !1;

      );
      return e;
    }
    Jg.exports = tG;
  });
  var r_ = u((kk, t_) => {
    var rG = Zn();
    function nG(e) {
      return typeof e == "function" ? e : rG;
    }
    t_.exports = nG;
  });
  var i_ = u((Kk, n_) => {
    var iG = e_(),
      aG = Bo(),
      oG = r_(),
      sG = Re();
    function uG(e, t) {
      var r = sG(e) ? iG : aG;
      return r(e, oG(t));
    }
    n_.exports = uG;
  });
  var o_ = u((zk, a_) => {
    var cG = et(),
      lG = function () {
        return cG.Date.now();
      };
    a_.exports = lG;
  });
  var c_ = u((Yk, u_) => {
    var fG = lt(),
      ns = o_(),
      s_ = Jn(),
      dG = "Expected a function",
      pG = Math.max,
      vG = Math.min;
    function hG(e, t, r) {
      var n,
        a,
        i,
        o,
        s,
        c,
        d = 0,
        v = !1,
        p = !1,
        h = !0;
      if (typeof e != "function") throw new TypeError(dG);
      (t = s_(t) || 0),
        fG(r) &&
          ((v = !!r.leading),
          (p = "maxWait" in r),
          (i = p ? pG(s_(r.maxWait) || 0, t) : i),
          (h = "trailing" in r ? !!r.trailing : h));
      function I(x) {
        var U = n,
          H = a;
        return (n = a = void 0), (d = x), (o = e.apply(H, U)), o;
      }
      function m(x) {
        return (d = x), (s = setTimeout(C, t)), v ? I(x) : o;
      }
      function T(x) {
        var U = x - c,
          H = x - d,
          k = t - U;
        return p ? vG(k, i - H) : k;
      }
      function L(x) {
        var U = x - c,
          H = x - d;
        return c === void 0 || U >= t || U < 0 || (p && H >= i);
      }
      function C() {
        var x = ns();
        if (L(x)) return N(x);
        s = setTimeout(C, T(x));
      }
      function N(x) {
        return (s = void 0), h && n ? I(x) : ((n = a = void 0), o);
      }
      function A() {
        s !== void 0 && clearTimeout(s), (d = 0), (n = c = a = s = void 0);
      }
      function M() {
        return s === void 0 ? o : N(ns());
      }
      function q() {
        var x = ns(),
          U = L(x);
        if (((n = arguments), (a = this), (c = x), U)) {
          if (s === void 0) return m(c);
          if (p) return clearTimeout(s), (s = setTimeout(C, t)), I(c);
        }
        return s === void 0 && (s = setTimeout(C, t)), o;
      }
      return (q.cancel = A), (q.flush = M), q;
    }
    u_.exports = hG;
  });
  var f_ = u(($k, l_) => {
    var EG = c_(),
      gG = lt(),
      _G = "Expected a function";
    function yG(e, t, r) {
      var n = !0,
        a = !0;
      if (typeof e != "function") throw new TypeError(_G);
      return (
        gG(r) &&
          ((n = "leading" in r ? !!r.leading : n),
          (a = "trailing" in r ? !!r.trailing : a)),
        EG(e, t, { leading: n, maxWait: t, trailing: a })
      );
    }
    l_.exports = yG;
  });
  var gi = u((ie) => {
    "use strict";
    var IG = Qe().default;
    Object.defineProperty(ie, "__esModule", { value: !0 });
    ie.viewportWidthChanged =
      ie.testFrameRendered =
      ie.stopRequested =
      ie.sessionStopped =
      ie.sessionStarted =
      ie.sessionInitialized =
      ie.rawDataImported =
      ie.previewRequested =
      ie.playbackRequested =
      ie.parameterChanged =
      ie.mediaQueriesDefined =
      ie.instanceStarted =
      ie.instanceRemoved =
      ie.instanceAdded =
      ie.eventStateChanged =
      ie.eventListenerAdded =
      ie.elementStateChanged =
      ie.clearRequested =
      ie.animationFrameChanged =
      ie.actionListPlaybackChanged =
        void 0;
    var d_ = IG(rr()),
      p_ = Xe(),
      mG = Bt(),
      {
        IX2_RAW_DATA_IMPORTED: TG,
        IX2_SESSION_INITIALIZED: OG,
        IX2_SESSION_STARTED: bG,
        IX2_SESSION_STOPPED: SG,
        IX2_PREVIEW_REQUESTED: AG,
        IX2_PLAYBACK_REQUESTED: wG,
        IX2_STOP_REQUESTED: RG,
        IX2_CLEAR_REQUESTED: CG,
        IX2_EVENT_LISTENER_ADDED: NG,
        IX2_TEST_FRAME_RENDERED: PG,
        IX2_EVENT_STATE_CHANGED: qG,
        IX2_ANIMATION_FRAME_CHANGED: xG,
        IX2_PARAMETER_CHANGED: LG,
        IX2_INSTANCE_ADDED: MG,
        IX2_INSTANCE_STARTED: DG,
        IX2_INSTANCE_REMOVED: FG,
        IX2_ELEMENT_STATE_CHANGED: GG,
        IX2_ACTION_LIST_PLAYBACK_CHANGED: XG,
        IX2_VIEWPORT_WIDTH_CHANGED: UG,
        IX2_MEDIA_QUERIES_DEFINED: VG,
      } = p_.IX2EngineActionTypes,
      { reifyState: WG } = mG.IX2VanillaUtils,
      BG = (e) => ({ type: TG, payload: (0, d_.default)({}, WG(e)) });
    ie.rawDataImported = BG;
    var jG = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
      type: OG,
      payload: { hasBoundaryNodes: e, reducedMotion: t },
    });
    ie.sessionInitialized = jG;
    var HG = () => ({ type: bG });
    ie.sessionStarted = HG;
    var kG = () => ({ type: SG });
    ie.sessionStopped = kG;
    var KG = ({ rawData: e, defer: t }) => ({
      type: AG,
      payload: { defer: t, rawData: e },
    });
    ie.previewRequested = KG;
    var zG = ({
      actionTypeId: e = p_.ActionTypeConsts.GENERAL_START_ACTION,
      actionListId: t,
      actionItemId: r,
      eventId: n,
      allowEvents: a,
      immediate: i,
      testManual: o,
      verbose: s,
      rawData: c,
    }) => ({
      type: wG,
      payload: {
        actionTypeId: e,
        actionListId: t,
        actionItemId: r,
        testManual: o,
        eventId: n,
        allowEvents: a,
        immediate: i,
        verbose: s,
        rawData: c,
      },
    });
    ie.playbackRequested = zG;
    var YG = (e) => ({ type: RG, payload: { actionListId: e } });
    ie.stopRequested = YG;
    var $G = () => ({ type: CG });
    ie.clearRequested = $G;
    var QG = (e, t) => ({
      type: NG,
      payload: { target: e, listenerParams: t },
    });
    ie.eventListenerAdded = QG;
    var ZG = (e = 1) => ({ type: PG, payload: { step: e } });
    ie.testFrameRendered = ZG;
    var JG = (e, t) => ({ type: qG, payload: { stateKey: e, newState: t } });
    ie.eventStateChanged = JG;
    var eX = (e, t) => ({ type: xG, payload: { now: e, parameters: t } });
    ie.animationFrameChanged = eX;
    var tX = (e, t) => ({ type: LG, payload: { key: e, value: t } });
    ie.parameterChanged = tX;
    var rX = (e) => ({ type: MG, payload: (0, d_.default)({}, e) });
    ie.instanceAdded = rX;
    var nX = (e, t) => ({ type: DG, payload: { instanceId: e, time: t } });
    ie.instanceStarted = nX;
    var iX = (e) => ({ type: FG, payload: { instanceId: e } });
    ie.instanceRemoved = iX;
    var aX = (e, t, r, n) => ({
      type: GG,
      payload: { elementId: e, actionTypeId: t, current: r, actionItem: n },
    });
    ie.elementStateChanged = aX;
    var oX = ({ actionListId: e, isPlaying: t }) => ({
      type: XG,
      payload: { actionListId: e, isPlaying: t },
    });
    ie.actionListPlaybackChanged = oX;
    var sX = ({ width: e, mediaQueries: t }) => ({
      type: UG,
      payload: { width: e, mediaQueries: t },
    });
    ie.viewportWidthChanged = sX;
    var uX = () => ({ type: VG });
    ie.mediaQueriesDefined = uX;
  });
  var E_ = u((Pe) => {
    "use strict";
    Object.defineProperty(Pe, "__esModule", { value: !0 });
    Pe.elementContains = IX;
    Pe.getChildElements = TX;
    Pe.getClosestElement = void 0;
    Pe.getProperty = hX;
    Pe.getQuerySelector = gX;
    Pe.getRefType = SX;
    Pe.getSiblingElements = OX;
    Pe.getStyle = vX;
    Pe.getValidDocument = _X;
    Pe.isSiblingNode = mX;
    Pe.matchSelector = EX;
    Pe.queryDocument = yX;
    Pe.setStyle = pX;
    var cX = Bt(),
      lX = Xe(),
      { ELEMENT_MATCHES: is } = cX.IX2BrowserSupport,
      {
        IX2_ID_DELIMITER: v_,
        HTML_ELEMENT: fX,
        PLAIN_OBJECT: dX,
        WF_PAGE: h_,
      } = lX.IX2EngineConstants;
    function pX(e, t, r) {
      e.style[t] = r;
    }
    function vX(e, t) {
      return e.style[t];
    }
    function hX(e, t) {
      return e[t];
    }
    function EX(e) {
      return (t) => t[is](e);
    }
    function gX({ id: e, selector: t }) {
      if (e) {
        let r = e;
        if (e.indexOf(v_) !== -1) {
          let n = e.split(v_),
            a = n[0];
          if (((r = n[1]), a !== document.documentElement.getAttribute(h_)))
            return null;
        }
        return `[data-w-id="${r}"], [data-w-id^="${r}_instance"]`;
      }
      return t;
    }
    function _X(e) {
      return e == null || e === document.documentElement.getAttribute(h_)
        ? document
        : null;
    }
    function yX(e, t) {
      return Array.prototype.slice.call(
        document.querySelectorAll(t ? e + " " + t : e)
      );
    }
    function IX(e, t) {
      return e.contains(t);
    }
    function mX(e, t) {
      return e !== t && e.parentNode === t.parentNode;
    }
    function TX(e) {
      let t = [];
      for (let r = 0, { length: n } = e || []; r < n; r++) {
        let { children: a } = e[r],
          { length: i } = a;
        if (i) for (let o = 0; o < i; o++) t.push(a[o]);
      }
      return t;
    }
    function OX(e = []) {
      let t = [],
        r = [];
      for (let n = 0, { length: a } = e; n < a; n++) {
        let { parentNode: i } = e[n];
        if (!i || !i.children || !i.children.length || r.indexOf(i) !== -1)
          continue;
        r.push(i);
        let o = i.firstElementChild;
        for (; o != null; )
          e.indexOf(o) === -1 && t.push(o), (o = o.nextElementSibling);
      }
      return t;
    }
    var bX = Element.prototype.closest
      ? (e, t) => (document.documentElement.contains(e) ? e.closest(t) : null)
      : (e, t) => {
          if (!document.documentElement.contains(e)) return null;
          let r = e;
          do {
            if (r[is] && r[is](t)) return r;
            r = r.parentNode;
          } while (r != null);
          return null;
        };
    Pe.getClosestElement = bX;
    function SX(e) {
      return e != null && typeof e == "object"
        ? e instanceof Element
          ? fX
          : dX
        : null;
    }
  });
  var as = u((Jk, __) => {
    var AX = lt(),
      g_ = Object.create,
      wX = (function () {
        function e() {}
        return function (t) {
          if (!AX(t)) return {};
          if (g_) return g_(t);
          e.prototype = t;
          var r = new e();
          return (e.prototype = void 0), r;
        };
      })();
    __.exports = wX;
  });
  var _i = u((eK, y_) => {
    function RX() {}
    y_.exports = RX;
  });
  var Ii = u((tK, I_) => {
    var CX = as(),
      NX = _i();
    function yi(e, t) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__chain__ = !!t),
        (this.__index__ = 0),
        (this.__values__ = void 0);
    }
    yi.prototype = CX(NX.prototype);
    yi.prototype.constructor = yi;
    I_.exports = yi;
  });
  var b_ = u((rK, O_) => {
    var m_ = Zt(),
      PX = Ur(),
      qX = Re(),
      T_ = m_ ? m_.isConcatSpreadable : void 0;
    function xX(e) {
      return qX(e) || PX(e) || !!(T_ && e && e[T_]);
    }
    O_.exports = xX;
  });
  var w_ = u((nK, A_) => {
    var LX = Un(),
      MX = b_();
    function S_(e, t, r, n, a) {
      var i = -1,
        o = e.length;
      for (r || (r = MX), a || (a = []); ++i < o; ) {
        var s = e[i];
        t > 0 && r(s)
          ? t > 1
            ? S_(s, t - 1, r, n, a)
            : LX(a, s)
          : n || (a[a.length] = s);
      }
      return a;
    }
    A_.exports = S_;
  });
  var C_ = u((iK, R_) => {
    var DX = w_();
    function FX(e) {
      var t = e == null ? 0 : e.length;
      return t ? DX(e, 1) : [];
    }
    R_.exports = FX;
  });
  var P_ = u((aK, N_) => {
    function GX(e, t, r) {
      switch (r.length) {
        case 0:
          return e.call(t);
        case 1:
          return e.call(t, r[0]);
        case 2:
          return e.call(t, r[0], r[1]);
        case 3:
          return e.call(t, r[0], r[1], r[2]);
      }
      return e.apply(t, r);
    }
    N_.exports = GX;
  });
  var L_ = u((oK, x_) => {
    var XX = P_(),
      q_ = Math.max;
    function UX(e, t, r) {
      return (
        (t = q_(t === void 0 ? e.length - 1 : t, 0)),
        function () {
          for (
            var n = arguments, a = -1, i = q_(n.length - t, 0), o = Array(i);
            ++a < i;

          )
            o[a] = n[t + a];
          a = -1;
          for (var s = Array(t + 1); ++a < t; ) s[a] = n[a];
          return (s[t] = r(o)), XX(e, this, s);
        }
      );
    }
    x_.exports = UX;
  });
  var D_ = u((sK, M_) => {
    function VX(e) {
      return function () {
        return e;
      };
    }
    M_.exports = VX;
  });
  var X_ = u((uK, G_) => {
    var WX = D_(),
      F_ = ts(),
      BX = Zn(),
      jX = F_
        ? function (e, t) {
            return F_(e, "toString", {
              configurable: !0,
              enumerable: !1,
              value: WX(t),
              writable: !0,
            });
          }
        : BX;
    G_.exports = jX;
  });
  var V_ = u((cK, U_) => {
    var HX = 800,
      kX = 16,
      KX = Date.now;
    function zX(e) {
      var t = 0,
        r = 0;
      return function () {
        var n = KX(),
          a = kX - (n - r);
        if (((r = n), a > 0)) {
          if (++t >= HX) return arguments[0];
        } else t = 0;
        return e.apply(void 0, arguments);
      };
    }
    U_.exports = zX;
  });
  var B_ = u((lK, W_) => {
    var YX = X_(),
      $X = V_(),
      QX = $X(YX);
    W_.exports = QX;
  });
  var H_ = u((fK, j_) => {
    var ZX = C_(),
      JX = L_(),
      eU = B_();
    function tU(e) {
      return eU(JX(e, void 0, ZX), e + "");
    }
    j_.exports = tU;
  });
  var z_ = u((dK, K_) => {
    var k_ = Eo(),
      rU = k_ && new k_();
    K_.exports = rU;
  });
  var $_ = u((pK, Y_) => {
    function nU() {}
    Y_.exports = nU;
  });
  var os = u((vK, Z_) => {
    var Q_ = z_(),
      iU = $_(),
      aU = Q_
        ? function (e) {
            return Q_.get(e);
          }
        : iU;
    Z_.exports = aU;
  });
  var ey = u((hK, J_) => {
    var oU = {};
    J_.exports = oU;
  });
  var ss = u((EK, ry) => {
    var ty = ey(),
      sU = Object.prototype,
      uU = sU.hasOwnProperty;
    function cU(e) {
      for (
        var t = e.name + "", r = ty[t], n = uU.call(ty, t) ? r.length : 0;
        n--;

      ) {
        var a = r[n],
          i = a.func;
        if (i == null || i == e) return a.name;
      }
      return t;
    }
    ry.exports = cU;
  });
  var Ti = u((gK, ny) => {
    var lU = as(),
      fU = _i(),
      dU = 4294967295;
    function mi(e) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__dir__ = 1),
        (this.__filtered__ = !1),
        (this.__iteratees__ = []),
        (this.__takeCount__ = dU),
        (this.__views__ = []);
    }
    mi.prototype = lU(fU.prototype);
    mi.prototype.constructor = mi;
    ny.exports = mi;
  });
  var ay = u((_K, iy) => {
    function pU(e, t) {
      var r = -1,
        n = e.length;
      for (t || (t = Array(n)); ++r < n; ) t[r] = e[r];
      return t;
    }
    iy.exports = pU;
  });
  var sy = u((yK, oy) => {
    var vU = Ti(),
      hU = Ii(),
      EU = ay();
    function gU(e) {
      if (e instanceof vU) return e.clone();
      var t = new hU(e.__wrapped__, e.__chain__);
      return (
        (t.__actions__ = EU(e.__actions__)),
        (t.__index__ = e.__index__),
        (t.__values__ = e.__values__),
        t
      );
    }
    oy.exports = gU;
  });
  var ly = u((IK, cy) => {
    var _U = Ti(),
      uy = Ii(),
      yU = _i(),
      IU = Re(),
      mU = _t(),
      TU = sy(),
      OU = Object.prototype,
      bU = OU.hasOwnProperty;
    function Oi(e) {
      if (mU(e) && !IU(e) && !(e instanceof _U)) {
        if (e instanceof uy) return e;
        if (bU.call(e, "__wrapped__")) return TU(e);
      }
      return new uy(e);
    }
    Oi.prototype = yU.prototype;
    Oi.prototype.constructor = Oi;
    cy.exports = Oi;
  });
  var dy = u((mK, fy) => {
    var SU = Ti(),
      AU = os(),
      wU = ss(),
      RU = ly();
    function CU(e) {
      var t = wU(e),
        r = RU[t];
      if (typeof r != "function" || !(t in SU.prototype)) return !1;
      if (e === r) return !0;
      var n = AU(r);
      return !!n && e === n[0];
    }
    fy.exports = CU;
  });
  var Ey = u((TK, hy) => {
    var py = Ii(),
      NU = H_(),
      PU = os(),
      us = ss(),
      qU = Re(),
      vy = dy(),
      xU = "Expected a function",
      LU = 8,
      MU = 32,
      DU = 128,
      FU = 256;
    function GU(e) {
      return NU(function (t) {
        var r = t.length,
          n = r,
          a = py.prototype.thru;
        for (e && t.reverse(); n--; ) {
          var i = t[n];
          if (typeof i != "function") throw new TypeError(xU);
          if (a && !o && us(i) == "wrapper") var o = new py([], !0);
        }
        for (n = o ? n : r; ++n < r; ) {
          i = t[n];
          var s = us(i),
            c = s == "wrapper" ? PU(i) : void 0;
          c &&
          vy(c[0]) &&
          c[1] == (DU | LU | MU | FU) &&
          !c[4].length &&
          c[9] == 1
            ? (o = o[us(c[0])].apply(o, c[3]))
            : (o = i.length == 1 && vy(i) ? o[s]() : o.thru(i));
        }
        return function () {
          var d = arguments,
            v = d[0];
          if (o && d.length == 1 && qU(v)) return o.plant(v).value();
          for (var p = 0, h = r ? t[p].apply(this, d) : v; ++p < r; )
            h = t[p].call(this, h);
          return h;
        };
      });
    }
    hy.exports = GU;
  });
  var _y = u((OK, gy) => {
    var XU = Ey(),
      UU = XU();
    gy.exports = UU;
  });
  var Iy = u((bK, yy) => {
    function VU(e, t, r) {
      return (
        e === e &&
          (r !== void 0 && (e = e <= r ? e : r),
          t !== void 0 && (e = e >= t ? e : t)),
        e
      );
    }
    yy.exports = VU;
  });
  var Ty = u((SK, my) => {
    var WU = Iy(),
      cs = Jn();
    function BU(e, t, r) {
      return (
        r === void 0 && ((r = t), (t = void 0)),
        r !== void 0 && ((r = cs(r)), (r = r === r ? r : 0)),
        t !== void 0 && ((t = cs(t)), (t = t === t ? t : 0)),
        WU(cs(e), t, r)
      );
    }
    my.exports = BU;
  });
  var Uy = u((Ri) => {
    "use strict";
    var wi = Qe().default;
    Object.defineProperty(Ri, "__esModule", { value: !0 });
    Ri.default = void 0;
    var He = wi(rr()),
      jU = wi(_y()),
      HU = wi(Qn()),
      kU = wi(Ty()),
      jt = Xe(),
      ls = vs(),
      bi = gi(),
      KU = Bt(),
      {
        MOUSE_CLICK: zU,
        MOUSE_SECOND_CLICK: YU,
        MOUSE_DOWN: $U,
        MOUSE_UP: QU,
        MOUSE_OVER: ZU,
        MOUSE_OUT: JU,
        DROPDOWN_CLOSE: eV,
        DROPDOWN_OPEN: tV,
        SLIDER_ACTIVE: rV,
        SLIDER_INACTIVE: nV,
        TAB_ACTIVE: iV,
        TAB_INACTIVE: aV,
        NAVBAR_CLOSE: oV,
        NAVBAR_OPEN: sV,
        MOUSE_MOVE: uV,
        PAGE_SCROLL_DOWN: Py,
        SCROLL_INTO_VIEW: qy,
        SCROLL_OUT_OF_VIEW: cV,
        PAGE_SCROLL_UP: lV,
        SCROLLING_IN_VIEW: fV,
        PAGE_FINISH: xy,
        ECOMMERCE_CART_CLOSE: dV,
        ECOMMERCE_CART_OPEN: pV,
        PAGE_START: Ly,
        PAGE_SCROLL: vV,
      } = jt.EventTypeConsts,
      fs = "COMPONENT_ACTIVE",
      My = "COMPONENT_INACTIVE",
      { COLON_DELIMITER: Oy } = jt.IX2EngineConstants,
      { getNamespacedParameterId: by } = KU.IX2VanillaUtils,
      Dy = (e) => (t) => typeof t == "object" && e(t) ? !0 : t,
      nn = Dy(({ element: e, nativeEvent: t }) => e === t.target),
      hV = Dy(({ element: e, nativeEvent: t }) => e.contains(t.target)),
      vt = (0, jU.default)([nn, hV]),
      Fy = (e, t) => {
        if (t) {
          let { ixData: r } = e.getState(),
            { events: n } = r,
            a = n[t];
          if (a && !gV[a.eventTypeId]) return a;
        }
        return null;
      },
      EV = ({ store: e, event: t }) => {
        let { action: r } = t,
          { autoStopEventId: n } = r.config;
        return !!Fy(e, n);
      },
      Ve = ({ store: e, event: t, element: r, eventStateKey: n }, a) => {
        let { action: i, id: o } = t,
          { actionListId: s, autoStopEventId: c } = i.config,
          d = Fy(e, c);
        return (
          d &&
            (0, ls.stopActionGroup)({
              store: e,
              eventId: c,
              eventTarget: r,
              eventStateKey: c + Oy + n.split(Oy)[1],
              actionListId: (0, HU.default)(d, "action.config.actionListId"),
            }),
          (0, ls.stopActionGroup)({
            store: e,
            eventId: o,
            eventTarget: r,
            eventStateKey: n,
            actionListId: s,
          }),
          (0, ls.startActionGroup)({
            store: e,
            eventId: o,
            eventTarget: r,
            eventStateKey: n,
            actionListId: s,
          }),
          a
        );
      },
      tt = (e, t) => (r, n) => e(r, n) === !0 ? t(r, n) : n,
      an = { handler: tt(vt, Ve) },
      Gy = (0, He.default)({}, an, { types: [fs, My].join(" ") }),
      ds = [
        { target: window, types: "resize orientationchange", throttle: !0 },
        {
          target: document,
          types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
          throttle: !0,
        },
      ],
      Sy = "mouseover mouseout",
      ps = { types: ds },
      gV = { PAGE_START: Ly, PAGE_FINISH: xy },
      rn = (() => {
        let e = window.pageXOffset !== void 0,
          r =
            document.compatMode === "CSS1Compat"
              ? document.documentElement
              : document.body;
        return () => ({
          scrollLeft: e ? window.pageXOffset : r.scrollLeft,
          scrollTop: e ? window.pageYOffset : r.scrollTop,
          stiffScrollTop: (0, kU.default)(
            e ? window.pageYOffset : r.scrollTop,
            0,
            r.scrollHeight - window.innerHeight
          ),
          scrollWidth: r.scrollWidth,
          scrollHeight: r.scrollHeight,
          clientWidth: r.clientWidth,
          clientHeight: r.clientHeight,
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
        });
      })(),
      _V = (e, t) =>
        !(
          e.left > t.right ||
          e.right < t.left ||
          e.top > t.bottom ||
          e.bottom < t.top
        ),
      yV = ({ element: e, nativeEvent: t }) => {
        let { type: r, target: n, relatedTarget: a } = t,
          i = e.contains(n);
        if (r === "mouseover" && i) return !0;
        let o = e.contains(a);
        return !!(r === "mouseout" && i && o);
      },
      IV = (e) => {
        let {
            element: t,
            event: { config: r },
          } = e,
          { clientWidth: n, clientHeight: a } = rn(),
          i = r.scrollOffsetValue,
          c = r.scrollOffsetUnit === "PX" ? i : (a * (i || 0)) / 100;
        return _V(t.getBoundingClientRect(), {
          left: 0,
          top: c,
          right: n,
          bottom: a - c,
        });
      },
      Xy = (e) => (t, r) => {
        let { type: n } = t.nativeEvent,
          a = [fs, My].indexOf(n) !== -1 ? n === fs : r.isActive,
          i = (0, He.default)({}, r, { isActive: a });
        return ((!r || i.isActive !== r.isActive) && e(t, i)) || i;
      },
      Ay = (e) => (t, r) => {
        let n = { elementHovered: yV(t) };
        return (
          ((r ? n.elementHovered !== r.elementHovered : n.elementHovered) &&
            e(t, n)) ||
          n
        );
      },
      mV = (e) => (t, r) => {
        let n = (0, He.default)({}, r, { elementVisible: IV(t) });
        return (
          ((r ? n.elementVisible !== r.elementVisible : n.elementVisible) &&
            e(t, n)) ||
          n
        );
      },
      wy =
        (e) =>
        (t, r = {}) => {
          let { stiffScrollTop: n, scrollHeight: a, innerHeight: i } = rn(),
            {
              event: { config: o, eventTypeId: s },
            } = t,
            { scrollOffsetValue: c, scrollOffsetUnit: d } = o,
            v = d === "PX",
            p = a - i,
            h = Number((n / p).toFixed(2));
          if (r && r.percentTop === h) return r;
          let I = (v ? c : (i * (c || 0)) / 100) / p,
            m,
            T,
            L = 0;
          r &&
            ((m = h > r.percentTop),
            (T = r.scrollingDown !== m),
            (L = T ? h : r.anchorTop));
          let C = s === Py ? h >= L + I : h <= L - I,
            N = (0, He.default)({}, r, {
              percentTop: h,
              inBounds: C,
              anchorTop: L,
              scrollingDown: m,
            });
          return (r && C && (T || N.inBounds !== r.inBounds) && e(t, N)) || N;
        },
      TV = (e, t) =>
        e.left > t.left &&
        e.left < t.right &&
        e.top > t.top &&
        e.top < t.bottom,
      OV = (e) => (t, r) => {
        let n = { finished: document.readyState === "complete" };
        return n.finished && !(r && r.finshed) && e(t), n;
      },
      bV = (e) => (t, r) => {
        let n = { started: !0 };
        return r || e(t), n;
      },
      Ry =
        (e) =>
        (t, r = { clickCount: 0 }) => {
          let n = { clickCount: (r.clickCount % 2) + 1 };
          return (n.clickCount !== r.clickCount && e(t, n)) || n;
        },
      Si = (e = !0) =>
        (0, He.default)({}, Gy, {
          handler: tt(
            e ? vt : nn,
            Xy((t, r) => (r.isActive ? an.handler(t, r) : r))
          ),
        }),
      Ai = (e = !0) =>
        (0, He.default)({}, Gy, {
          handler: tt(
            e ? vt : nn,
            Xy((t, r) => (r.isActive ? r : an.handler(t, r)))
          ),
        }),
      Cy = (0, He.default)({}, ps, {
        handler: mV((e, t) => {
          let { elementVisible: r } = t,
            { event: n, store: a } = e,
            { ixData: i } = a.getState(),
            { events: o } = i;
          return !o[n.action.config.autoStopEventId] && t.triggered
            ? t
            : (n.eventTypeId === qy) === r
            ? (Ve(e), (0, He.default)({}, t, { triggered: !0 }))
            : t;
        }),
      }),
      Ny = 0.05,
      SV = {
        [rV]: Si(),
        [nV]: Ai(),
        [tV]: Si(),
        [eV]: Ai(),
        [sV]: Si(!1),
        [oV]: Ai(!1),
        [iV]: Si(),
        [aV]: Ai(),
        [pV]: { types: "ecommerce-cart-open", handler: tt(vt, Ve) },
        [dV]: { types: "ecommerce-cart-close", handler: tt(vt, Ve) },
        [zU]: {
          types: "click",
          handler: tt(
            vt,
            Ry((e, { clickCount: t }) => {
              EV(e) ? t === 1 && Ve(e) : Ve(e);
            })
          ),
        },
        [YU]: {
          types: "click",
          handler: tt(
            vt,
            Ry((e, { clickCount: t }) => {
              t === 2 && Ve(e);
            })
          ),
        },
        [$U]: (0, He.default)({}, an, { types: "mousedown" }),
        [QU]: (0, He.default)({}, an, { types: "mouseup" }),
        [ZU]: {
          types: Sy,
          handler: tt(
            vt,
            Ay((e, t) => {
              t.elementHovered && Ve(e);
            })
          ),
        },
        [JU]: {
          types: Sy,
          handler: tt(
            vt,
            Ay((e, t) => {
              t.elementHovered || Ve(e);
            })
          ),
        },
        [uV]: {
          types: "mousemove mouseout scroll",
          handler: (
            {
              store: e,
              element: t,
              eventConfig: r,
              nativeEvent: n,
              eventStateKey: a,
            },
            i = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 }
          ) => {
            let {
                basedOn: o,
                selectedAxis: s,
                continuousParameterGroupId: c,
                reverse: d,
                restingState: v = 0,
              } = r,
              {
                clientX: p = i.clientX,
                clientY: h = i.clientY,
                pageX: I = i.pageX,
                pageY: m = i.pageY,
              } = n,
              T = s === "X_AXIS",
              L = n.type === "mouseout",
              C = v / 100,
              N = c,
              A = !1;
            switch (o) {
              case jt.EventBasedOn.VIEWPORT: {
                C = T
                  ? Math.min(p, window.innerWidth) / window.innerWidth
                  : Math.min(h, window.innerHeight) / window.innerHeight;
                break;
              }
              case jt.EventBasedOn.PAGE: {
                let {
                  scrollLeft: M,
                  scrollTop: q,
                  scrollWidth: x,
                  scrollHeight: U,
                } = rn();
                C = T ? Math.min(M + I, x) / x : Math.min(q + m, U) / U;
                break;
              }
              case jt.EventBasedOn.ELEMENT:
              default: {
                N = by(a, c);
                let M = n.type.indexOf("mouse") === 0;
                if (M && vt({ element: t, nativeEvent: n }) !== !0) break;
                let q = t.getBoundingClientRect(),
                  { left: x, top: U, width: H, height: k } = q;
                if (!M && !TV({ left: p, top: h }, q)) break;
                (A = !0), (C = T ? (p - x) / H : (h - U) / k);
                break;
              }
            }
            return (
              L && (C > 1 - Ny || C < Ny) && (C = Math.round(C)),
              (o !== jt.EventBasedOn.ELEMENT || A || A !== i.elementHovered) &&
                ((C = d ? 1 - C : C),
                e.dispatch((0, bi.parameterChanged)(N, C))),
              { elementHovered: A, clientX: p, clientY: h, pageX: I, pageY: m }
            );
          },
        },
        [vV]: {
          types: ds,
          handler: ({ store: e, eventConfig: t }) => {
            let { continuousParameterGroupId: r, reverse: n } = t,
              { scrollTop: a, scrollHeight: i, clientHeight: o } = rn(),
              s = a / (i - o);
            (s = n ? 1 - s : s), e.dispatch((0, bi.parameterChanged)(r, s));
          },
        },
        [fV]: {
          types: ds,
          handler: (
            { element: e, store: t, eventConfig: r, eventStateKey: n },
            a = { scrollPercent: 0 }
          ) => {
            let {
                scrollLeft: i,
                scrollTop: o,
                scrollWidth: s,
                scrollHeight: c,
                clientHeight: d,
              } = rn(),
              {
                basedOn: v,
                selectedAxis: p,
                continuousParameterGroupId: h,
                startsEntering: I,
                startsExiting: m,
                addEndOffset: T,
                addStartOffset: L,
                addOffsetValue: C = 0,
                endOffsetValue: N = 0,
              } = r,
              A = p === "X_AXIS";
            if (v === jt.EventBasedOn.VIEWPORT) {
              let M = A ? i / s : o / c;
              return (
                M !== a.scrollPercent &&
                  t.dispatch((0, bi.parameterChanged)(h, M)),
                { scrollPercent: M }
              );
            } else {
              let M = by(n, h),
                q = e.getBoundingClientRect(),
                x = (L ? C : 0) / 100,
                U = (T ? N : 0) / 100;
              (x = I ? x : 1 - x), (U = m ? U : 1 - U);
              let H = q.top + Math.min(q.height * x, d),
                re = q.top + q.height * U - H,
                Z = Math.min(d + re, c),
                b = Math.min(Math.max(0, d - H), Z) / Z;
              return (
                b !== a.scrollPercent &&
                  t.dispatch((0, bi.parameterChanged)(M, b)),
                { scrollPercent: b }
              );
            }
          },
        },
        [qy]: Cy,
        [cV]: Cy,
        [Py]: (0, He.default)({}, ps, {
          handler: wy((e, t) => {
            t.scrollingDown && Ve(e);
          }),
        }),
        [lV]: (0, He.default)({}, ps, {
          handler: wy((e, t) => {
            t.scrollingDown || Ve(e);
          }),
        }),
        [xy]: {
          types: "readystatechange IX2_PAGE_UPDATE",
          handler: tt(nn, OV(Ve)),
        },
        [Ly]: {
          types: "readystatechange IX2_PAGE_UPDATE",
          handler: tt(nn, bV(Ve)),
        },
      };
    Ri.default = SV;
  });
  var vs = u((Pt) => {
    "use strict";
    var nt = Qe().default,
      AV = Lt().default;
    Object.defineProperty(Pt, "__esModule", { value: !0 });
    Pt.observeRequests = rW;
    Pt.startActionGroup = Is;
    Pt.startEngine = xi;
    Pt.stopActionGroup = ys;
    Pt.stopAllActionGroups = Yy;
    Pt.stopEngine = Li;
    var wV = nt(rr()),
      RV = nt(ng()),
      CV = nt(qo()),
      Nt = nt(Qn()),
      NV = nt(Tg()),
      PV = nt(zg()),
      qV = nt($g()),
      xV = nt(Zg()),
      on = nt(i_()),
      LV = nt(f_()),
      rt = Xe(),
      By = Bt(),
      ye = gi(),
      Oe = AV(E_()),
      MV = nt(Uy()),
      DV = ["store", "computedStyle"],
      FV = Object.keys(rt.QuickEffectIds),
      hs = (e) => FV.includes(e),
      {
        COLON_DELIMITER: Es,
        BOUNDARY_SELECTOR: Ci,
        HTML_ELEMENT: jy,
        RENDER_GENERAL: GV,
        W_MOD_IX: Vy,
      } = rt.IX2EngineConstants,
      {
        getAffectedElements: Ni,
        getElementId: XV,
        getDestinationValues: gs,
        observeStore: Ht,
        getInstanceId: UV,
        renderHTMLElement: VV,
        clearAllStyles: Hy,
        getMaxDurationItemIndex: WV,
        getComputedStyle: BV,
        getInstanceOrigin: jV,
        reduceListToGroup: HV,
        shouldNamespaceEventParameter: kV,
        getNamespacedParameterId: KV,
        shouldAllowMediaQuery: Pi,
        cleanupHTMLElement: zV,
        clearObjectCache: YV,
        stringifyTarget: $V,
        mediaQueriesEqual: QV,
        shallowEqual: ZV,
      } = By.IX2VanillaUtils,
      {
        isPluginType: qi,
        createPluginInstance: _s,
        getPluginDuration: JV,
      } = By.IX2VanillaPlugins,
      Wy = navigator.userAgent,
      eW = Wy.match(/iPad/i) || Wy.match(/iPhone/),
      tW = 12;
    function rW(e) {
      Ht({ store: e, select: ({ ixRequest: t }) => t.preview, onChange: aW }),
        Ht({
          store: e,
          select: ({ ixRequest: t }) => t.playback,
          onChange: oW,
        }),
        Ht({ store: e, select: ({ ixRequest: t }) => t.stop, onChange: sW }),
        Ht({ store: e, select: ({ ixRequest: t }) => t.clear, onChange: uW });
    }
    function nW(e) {
      Ht({
        store: e,
        select: ({ ixSession: t }) => t.mediaQueryKey,
        onChange: () => {
          Li(e),
            Hy({ store: e, elementApi: Oe }),
            xi({ store: e, allowEvents: !0 }),
            ky();
        },
      });
    }
    function iW(e, t) {
      let r = Ht({
        store: e,
        select: ({ ixSession: n }) => n.tick,
        onChange: (n) => {
          t(n), r();
        },
      });
    }
    function aW({ rawData: e, defer: t }, r) {
      let n = () => {
        xi({ store: r, rawData: e, allowEvents: !0 }), ky();
      };
      t ? setTimeout(n, 0) : n();
    }
    function ky() {
      document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
    }
    function oW(e, t) {
      let {
          actionTypeId: r,
          actionListId: n,
          actionItemId: a,
          eventId: i,
          allowEvents: o,
          immediate: s,
          testManual: c,
          verbose: d = !0,
        } = e,
        { rawData: v } = e;
      if (n && a && v && s) {
        let p = v.actionLists[n];
        p && (v = HV({ actionList: p, actionItemId: a, rawData: v }));
      }
      if (
        (xi({ store: t, rawData: v, allowEvents: o, testManual: c }),
        (n && r === rt.ActionTypeConsts.GENERAL_START_ACTION) || hs(r))
      ) {
        ys({ store: t, actionListId: n }),
          zy({ store: t, actionListId: n, eventId: i });
        let p = Is({
          store: t,
          eventId: i,
          actionListId: n,
          immediate: s,
          verbose: d,
        });
        d &&
          p &&
          t.dispatch(
            (0, ye.actionListPlaybackChanged)({
              actionListId: n,
              isPlaying: !s,
            })
          );
      }
    }
    function sW({ actionListId: e }, t) {
      e ? ys({ store: t, actionListId: e }) : Yy({ store: t }), Li(t);
    }
    function uW(e, t) {
      Li(t), Hy({ store: t, elementApi: Oe });
    }
    function xi({ store: e, rawData: t, allowEvents: r, testManual: n }) {
      let { ixSession: a } = e.getState();
      t && e.dispatch((0, ye.rawDataImported)(t)),
        a.active ||
          (e.dispatch(
            (0, ye.sessionInitialized)({
              hasBoundaryNodes: !!document.querySelector(Ci),
              reducedMotion:
                document.body.hasAttribute("data-wf-ix-vacation") &&
                window.matchMedia("(prefers-reduced-motion)").matches,
            })
          ),
          r &&
            (vW(e),
            cW(),
            e.getState().ixSession.hasDefinedMediaQueries && nW(e)),
          e.dispatch((0, ye.sessionStarted)()),
          lW(e, n));
    }
    function cW() {
      let { documentElement: e } = document;
      e.className.indexOf(Vy) === -1 && (e.className += ` ${Vy}`);
    }
    function lW(e, t) {
      let r = (n) => {
        let { ixSession: a, ixParameters: i } = e.getState();
        a.active &&
          (e.dispatch((0, ye.animationFrameChanged)(n, i)),
          t ? iW(e, r) : requestAnimationFrame(r));
      };
      r(window.performance.now());
    }
    function Li(e) {
      let { ixSession: t } = e.getState();
      if (t.active) {
        let { eventListeners: r } = t;
        r.forEach(fW), YV(), e.dispatch((0, ye.sessionStopped)());
      }
    }
    function fW({ target: e, listenerParams: t }) {
      e.removeEventListener.apply(e, t);
    }
    function dW({
      store: e,
      eventStateKey: t,
      eventTarget: r,
      eventId: n,
      eventConfig: a,
      actionListId: i,
      parameterGroup: o,
      smoothing: s,
      restingValue: c,
    }) {
      let { ixData: d, ixSession: v } = e.getState(),
        { events: p } = d,
        h = p[n],
        { eventTypeId: I } = h,
        m = {},
        T = {},
        L = [],
        { continuousActionGroups: C } = o,
        { id: N } = o;
      kV(I, a) && (N = KV(t, N));
      let A = v.hasBoundaryNodes && r ? Oe.getClosestElement(r, Ci) : null;
      C.forEach((M) => {
        let { keyframe: q, actionItems: x } = M;
        x.forEach((U) => {
          let { actionTypeId: H } = U,
            { target: k } = U.config;
          if (!k) return;
          let re = k.boundaryMode ? A : null,
            Z = $V(k) + Es + H;
          if (((T[Z] = pW(T[Z], q, U)), !m[Z])) {
            m[Z] = !0;
            let { config: X } = U;
            Ni({
              config: X,
              event: h,
              eventTarget: r,
              elementRoot: re,
              elementApi: Oe,
            }).forEach((b) => {
              L.push({ element: b, key: Z });
            });
          }
        });
      }),
        L.forEach(({ element: M, key: q }) => {
          let x = T[q],
            U = (0, Nt.default)(x, "[0].actionItems[0]", {}),
            { actionTypeId: H } = U,
            k = qi(H) ? _s(H)(M, U) : null,
            re = gs({ element: M, actionItem: U, elementApi: Oe }, k);
          ms({
            store: e,
            element: M,
            eventId: n,
            actionListId: i,
            actionItem: U,
            destination: re,
            continuous: !0,
            parameterId: N,
            actionGroups: x,
            smoothing: s,
            restingValue: c,
            pluginInstance: k,
          });
        });
    }
    function pW(e = [], t, r) {
      let n = [...e],
        a;
      return (
        n.some((i, o) => (i.keyframe === t ? ((a = o), !0) : !1)),
        a == null && ((a = n.length), n.push({ keyframe: t, actionItems: [] })),
        n[a].actionItems.push(r),
        n
      );
    }
    function vW(e) {
      let { ixData: t } = e.getState(),
        { eventTypeMap: r } = t;
      Ky(e),
        (0, on.default)(r, (a, i) => {
          let o = MV.default[i];
          if (!o) {
            console.warn(`IX2 event type not configured: ${i}`);
            return;
          }
          IW({ logic: o, store: e, events: a });
        });
      let { ixSession: n } = e.getState();
      n.eventListeners.length && EW(e);
    }
    var hW = ["resize", "orientationchange"];
    function EW(e) {
      let t = () => {
        Ky(e);
      };
      hW.forEach((r) => {
        window.addEventListener(r, t),
          e.dispatch((0, ye.eventListenerAdded)(window, [r, t]));
      }),
        t();
    }
    function Ky(e) {
      let { ixSession: t, ixData: r } = e.getState(),
        n = window.innerWidth;
      if (n !== t.viewportWidth) {
        let { mediaQueries: a } = r;
        e.dispatch((0, ye.viewportWidthChanged)({ width: n, mediaQueries: a }));
      }
    }
    var gW = (e, t) => (0, PV.default)((0, xV.default)(e, t), qV.default),
      _W = (e, t) => {
        (0, on.default)(e, (r, n) => {
          r.forEach((a, i) => {
            let o = n + Es + i;
            t(a, n, o);
          });
        });
      },
      yW = (e) => {
        let t = { target: e.target, targets: e.targets };
        return Ni({ config: t, elementApi: Oe });
      };
    function IW({ logic: e, store: t, events: r }) {
      mW(r);
      let { types: n, handler: a } = e,
        { ixData: i } = t.getState(),
        { actionLists: o } = i,
        s = gW(r, yW);
      if (!(0, NV.default)(s)) return;
      (0, on.default)(s, (p, h) => {
        let I = r[h],
          { action: m, id: T, mediaQueries: L = i.mediaQueryKeys } = I,
          { actionListId: C } = m.config;
        QV(L, i.mediaQueryKeys) || t.dispatch((0, ye.mediaQueriesDefined)()),
          m.actionTypeId === rt.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION &&
            (Array.isArray(I.config) ? I.config : [I.config]).forEach((A) => {
              let { continuousParameterGroupId: M } = A,
                q = (0, Nt.default)(o, `${C}.continuousParameterGroups`, []),
                x = (0, CV.default)(q, ({ id: k }) => k === M),
                U = (A.smoothing || 0) / 100,
                H = (A.restingState || 0) / 100;
              x &&
                p.forEach((k, re) => {
                  let Z = T + Es + re;
                  dW({
                    store: t,
                    eventStateKey: Z,
                    eventTarget: k,
                    eventId: T,
                    eventConfig: A,
                    actionListId: C,
                    parameterGroup: x,
                    smoothing: U,
                    restingValue: H,
                  });
                });
            }),
          (m.actionTypeId === rt.ActionTypeConsts.GENERAL_START_ACTION ||
            hs(m.actionTypeId)) &&
            zy({ store: t, actionListId: C, eventId: T });
      });
      let c = (p) => {
          let { ixSession: h } = t.getState();
          _W(s, (I, m, T) => {
            let L = r[m],
              C = h.eventState[T],
              { action: N, mediaQueries: A = i.mediaQueryKeys } = L;
            if (!Pi(A, h.mediaQueryKey)) return;
            let M = (q = {}) => {
              let x = a(
                {
                  store: t,
                  element: I,
                  event: L,
                  eventConfig: q,
                  nativeEvent: p,
                  eventStateKey: T,
                },
                C
              );
              ZV(x, C) || t.dispatch((0, ye.eventStateChanged)(T, x));
            };
            N.actionTypeId === rt.ActionTypeConsts.GENERAL_CONTINUOUS_ACTION
              ? (Array.isArray(L.config) ? L.config : [L.config]).forEach(M)
              : M();
          });
        },
        d = (0, LV.default)(c, tW),
        v = ({ target: p = document, types: h, throttle: I }) => {
          h.split(" ")
            .filter(Boolean)
            .forEach((m) => {
              let T = I ? d : c;
              p.addEventListener(m, T),
                t.dispatch((0, ye.eventListenerAdded)(p, [m, T]));
            });
        };
      Array.isArray(n) ? n.forEach(v) : typeof n == "string" && v(e);
    }
    function mW(e) {
      if (!eW) return;
      let t = {},
        r = "";
      for (let n in e) {
        let { eventTypeId: a, target: i } = e[n],
          o = Oe.getQuerySelector(i);
        t[o] ||
          ((a === rt.EventTypeConsts.MOUSE_CLICK ||
            a === rt.EventTypeConsts.MOUSE_SECOND_CLICK) &&
            ((t[o] = !0),
            (r += o + "{cursor: pointer;touch-action: manipulation;}")));
      }
      if (r) {
        let n = document.createElement("style");
        (n.textContent = r), document.body.appendChild(n);
      }
    }
    function zy({ store: e, actionListId: t, eventId: r }) {
      let { ixData: n, ixSession: a } = e.getState(),
        { actionLists: i, events: o } = n,
        s = o[r],
        c = i[t];
      if (c && c.useFirstGroupAsInitialState) {
        let d = (0, Nt.default)(c, "actionItemGroups[0].actionItems", []),
          v = (0, Nt.default)(s, "mediaQueries", n.mediaQueryKeys);
        if (!Pi(v, a.mediaQueryKey)) return;
        d.forEach((p) => {
          var h;
          let { config: I, actionTypeId: m } = p,
            T =
              (I == null || (h = I.target) === null || h === void 0
                ? void 0
                : h.useEventTarget) === !0
                ? { target: s.target, targets: s.targets }
                : I,
            L = Ni({ config: T, event: s, elementApi: Oe }),
            C = qi(m);
          L.forEach((N) => {
            let A = C ? _s(m)(N, p) : null;
            ms({
              destination: gs({ element: N, actionItem: p, elementApi: Oe }, A),
              immediate: !0,
              store: e,
              element: N,
              eventId: r,
              actionItem: p,
              actionListId: t,
              pluginInstance: A,
            });
          });
        });
      }
    }
    function Yy({ store: e }) {
      let { ixInstances: t } = e.getState();
      (0, on.default)(t, (r) => {
        if (!r.continuous) {
          let { actionListId: n, verbose: a } = r;
          Ts(r, e),
            a &&
              e.dispatch(
                (0, ye.actionListPlaybackChanged)({
                  actionListId: n,
                  isPlaying: !1,
                })
              );
        }
      });
    }
    function ys({
      store: e,
      eventId: t,
      eventTarget: r,
      eventStateKey: n,
      actionListId: a,
    }) {
      let { ixInstances: i, ixSession: o } = e.getState(),
        s = o.hasBoundaryNodes && r ? Oe.getClosestElement(r, Ci) : null;
      (0, on.default)(i, (c) => {
        let d = (0, Nt.default)(c, "actionItem.config.target.boundaryMode"),
          v = n ? c.eventStateKey === n : !0;
        if (c.actionListId === a && c.eventId === t && v) {
          if (s && d && !Oe.elementContains(s, c.element)) return;
          Ts(c, e),
            c.verbose &&
              e.dispatch(
                (0, ye.actionListPlaybackChanged)({
                  actionListId: a,
                  isPlaying: !1,
                })
              );
        }
      });
    }
    function Is({
      store: e,
      eventId: t,
      eventTarget: r,
      eventStateKey: n,
      actionListId: a,
      groupIndex: i = 0,
      immediate: o,
      verbose: s,
    }) {
      var c;
      let { ixData: d, ixSession: v } = e.getState(),
        { events: p } = d,
        h = p[t] || {},
        { mediaQueries: I = d.mediaQueryKeys } = h,
        m = (0, Nt.default)(d, `actionLists.${a}`, {}),
        { actionItemGroups: T, useFirstGroupAsInitialState: L } = m;
      if (!T || !T.length) return !1;
      i >= T.length && (0, Nt.default)(h, "config.loop") && (i = 0),
        i === 0 && L && i++;
      let N =
          (i === 0 || (i === 1 && L)) &&
          hs((c = h.action) === null || c === void 0 ? void 0 : c.actionTypeId)
            ? h.config.delay
            : void 0,
        A = (0, Nt.default)(T, [i, "actionItems"], []);
      if (!A.length || !Pi(I, v.mediaQueryKey)) return !1;
      let M = v.hasBoundaryNodes && r ? Oe.getClosestElement(r, Ci) : null,
        q = WV(A),
        x = !1;
      return (
        A.forEach((U, H) => {
          let { config: k, actionTypeId: re } = U,
            Z = qi(re),
            { target: X } = k;
          if (!X) return;
          let b = X.boundaryMode ? M : null;
          Ni({
            config: k,
            event: h,
            eventTarget: r,
            elementRoot: b,
            elementApi: Oe,
          }).forEach((G, V) => {
            let $ = Z ? _s(re)(G, U) : null,
              J = Z ? JV(re)(G, U) : null;
            x = !0;
            let F = q === H && V === 0,
              j = BV({ element: G, actionItem: U }),
              f = gs({ element: G, actionItem: U, elementApi: Oe }, $);
            ms({
              store: e,
              element: G,
              actionItem: U,
              eventId: t,
              eventTarget: r,
              eventStateKey: n,
              actionListId: a,
              groupIndex: i,
              isCarrier: F,
              computedStyle: j,
              destination: f,
              immediate: o,
              verbose: s,
              pluginInstance: $,
              pluginDuration: J,
              instanceDelay: N,
            });
          });
        }),
        x
      );
    }
    function ms(e) {
      var t;
      let { store: r, computedStyle: n } = e,
        a = (0, RV.default)(e, DV),
        {
          element: i,
          actionItem: o,
          immediate: s,
          pluginInstance: c,
          continuous: d,
          restingValue: v,
          eventId: p,
        } = a,
        h = !d,
        I = UV(),
        { ixElements: m, ixSession: T, ixData: L } = r.getState(),
        C = XV(m, i),
        { refState: N } = m[C] || {},
        A = Oe.getRefType(i),
        M = T.reducedMotion && rt.ReducedMotionTypes[o.actionTypeId],
        q;
      if (M && d)
        switch (
          (t = L.events[p]) === null || t === void 0 ? void 0 : t.eventTypeId
        ) {
          case rt.EventTypeConsts.MOUSE_MOVE:
          case rt.EventTypeConsts.MOUSE_MOVE_IN_VIEWPORT:
            q = v;
            break;
          default:
            q = 0.5;
            break;
        }
      let x = jV(i, N, n, o, Oe, c);
      if (
        (r.dispatch(
          (0, ye.instanceAdded)(
            (0, wV.default)(
              {
                instanceId: I,
                elementId: C,
                origin: x,
                refType: A,
                skipMotion: M,
                skipToValue: q,
              },
              a
            )
          )
        ),
        $y(document.body, "ix2-animation-started", I),
        s)
      ) {
        TW(r, I);
        return;
      }
      Ht({ store: r, select: ({ ixInstances: U }) => U[I], onChange: Qy }),
        h && r.dispatch((0, ye.instanceStarted)(I, T.tick));
    }
    function Ts(e, t) {
      $y(document.body, "ix2-animation-stopping", {
        instanceId: e.id,
        state: t.getState(),
      });
      let { elementId: r, actionItem: n } = e,
        { ixElements: a } = t.getState(),
        { ref: i, refType: o } = a[r] || {};
      o === jy && zV(i, n, Oe), t.dispatch((0, ye.instanceRemoved)(e.id));
    }
    function $y(e, t, r) {
      let n = document.createEvent("CustomEvent");
      n.initCustomEvent(t, !0, !0, r), e.dispatchEvent(n);
    }
    function TW(e, t) {
      let { ixParameters: r } = e.getState();
      e.dispatch((0, ye.instanceStarted)(t, 0)),
        e.dispatch((0, ye.animationFrameChanged)(performance.now(), r));
      let { ixInstances: n } = e.getState();
      Qy(n[t], e);
    }
    function Qy(e, t) {
      let {
          active: r,
          continuous: n,
          complete: a,
          elementId: i,
          actionItem: o,
          actionTypeId: s,
          renderType: c,
          current: d,
          groupIndex: v,
          eventId: p,
          eventTarget: h,
          eventStateKey: I,
          actionListId: m,
          isCarrier: T,
          styleProp: L,
          verbose: C,
          pluginInstance: N,
        } = e,
        { ixData: A, ixSession: M } = t.getState(),
        { events: q } = A,
        x = q[p] || {},
        { mediaQueries: U = A.mediaQueryKeys } = x;
      if (Pi(U, M.mediaQueryKey) && (n || r || a)) {
        if (d || (c === GV && a)) {
          t.dispatch((0, ye.elementStateChanged)(i, s, d, o));
          let { ixElements: H } = t.getState(),
            { ref: k, refType: re, refState: Z } = H[i] || {},
            X = Z && Z[s];
          (re === jy || qi(s)) && VV(k, Z, X, p, o, L, Oe, c, N);
        }
        if (a) {
          if (T) {
            let H = Is({
              store: t,
              eventId: p,
              eventTarget: h,
              eventStateKey: I,
              actionListId: m,
              groupIndex: v + 1,
              verbose: C,
            });
            C &&
              !H &&
              t.dispatch(
                (0, ye.actionListPlaybackChanged)({
                  actionListId: m,
                  isPlaying: !1,
                })
              );
          }
          Ts(e, t);
        }
      }
    }
  });
  var Jy = u((mt) => {
    "use strict";
    var OW = Lt().default,
      bW = Qe().default;
    Object.defineProperty(mt, "__esModule", { value: !0 });
    mt.actions = void 0;
    mt.destroy = Zy;
    mt.init = CW;
    mt.setEnv = RW;
    mt.store = void 0;
    Fl();
    var SW = $a(),
      AW = bW(rg()),
      Os = vs(),
      wW = OW(gi());
    mt.actions = wW;
    var Mi = (0, SW.createStore)(AW.default);
    mt.store = Mi;
    function RW(e) {
      e() && (0, Os.observeRequests)(Mi);
    }
    function CW(e) {
      Zy(), (0, Os.startEngine)({ store: Mi, rawData: e, allowEvents: !0 });
    }
    function Zy() {
      (0, Os.stopEngine)(Mi);
    }
  });
  var nI = u((CK, rI) => {
    var eI = $e(),
      tI = Jy();
    tI.setEnv(eI.env);
    eI.define(
      "ix2",
      (rI.exports = function () {
        return tI;
      })
    );
  });
  var aI = u((NK, iI) => {
    var Or = $e();
    Or.define(
      "links",
      (iI.exports = function (e, t) {
        var r = {},
          n = e(window),
          a,
          i = Or.env(),
          o = window.location,
          s = document.createElement("a"),
          c = "w--current",
          d = /index\.(html|php)$/,
          v = /\/$/,
          p,
          h;
        r.ready = r.design = r.preview = I;
        function I() {
          (a = i && Or.env("design")),
            (h = Or.env("slug") || o.pathname || ""),
            Or.scroll.off(T),
            (p = []);
          for (var C = document.links, N = 0; N < C.length; ++N) m(C[N]);
          p.length && (Or.scroll.on(T), T());
        }
        function m(C) {
          var N =
            (a && C.getAttribute("href-disabled")) || C.getAttribute("href");
          if (((s.href = N), !(N.indexOf(":") >= 0))) {
            var A = e(C);
            if (
              s.hash.length > 1 &&
              s.host + s.pathname === o.host + o.pathname
            ) {
              if (!/^#[a-zA-Z0-9\-\_]+$/.test(s.hash)) return;
              var M = e(s.hash);
              M.length && p.push({ link: A, sec: M, active: !1 });
              return;
            }
            if (!(N === "#" || N === "")) {
              var q = s.href === o.href || N === h || (d.test(N) && v.test(h));
              L(A, c, q);
            }
          }
        }
        function T() {
          var C = n.scrollTop(),
            N = n.height();
          t.each(p, function (A) {
            var M = A.link,
              q = A.sec,
              x = q.offset().top,
              U = q.outerHeight(),
              H = N * 0.5,
              k = q.is(":visible") && x + U - H >= C && x + H <= C + N;
            A.active !== k && ((A.active = k), L(M, c, k));
          });
        }
        function L(C, N, A) {
          var M = C.hasClass(N);
          (A && M) || (!A && !M) || (A ? C.addClass(N) : C.removeClass(N));
        }
        return r;
      })
    );
  });
  var sI = u((PK, oI) => {
    var Di = $e();
    Di.define(
      "scroll",
      (oI.exports = function (e) {
        var t = {
            WF_CLICK_EMPTY: "click.wf-empty-link",
            WF_CLICK_SCROLL: "click.wf-scroll",
          },
          r = window.location,
          n = m() ? null : window.history,
          a = e(window),
          i = e(document),
          o = e(document.body),
          s =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (X) {
              window.setTimeout(X, 15);
            },
          c = Di.env("editor") ? ".w-editor-body" : "body",
          d =
            "header, " +
            c +
            " > .header, " +
            c +
            " > .w-nav:not([data-no-scroll])",
          v = 'a[href="#"]',
          p = 'a[href*="#"]:not(.w-tab-link):not(' + v + ")",
          h = '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}',
          I = document.createElement("style");
        I.appendChild(document.createTextNode(h));
        function m() {
          try {
            return !!window.frameElement;
          } catch {
            return !0;
          }
        }
        var T = /^#[a-zA-Z0-9][\w:.-]*$/;
        function L(X) {
          return T.test(X.hash) && X.host + X.pathname === r.host + r.pathname;
        }
        let C =
          typeof window.matchMedia == "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)");
        function N() {
          return (
            document.body.getAttribute("data-wf-scroll-motion") === "none" ||
            C.matches
          );
        }
        function A(X, b) {
          var D;
          switch (b) {
            case "add":
              (D = X.attr("tabindex")),
                D
                  ? X.attr("data-wf-tabindex-swap", D)
                  : X.attr("tabindex", "-1");
              break;
            case "remove":
              (D = X.attr("data-wf-tabindex-swap")),
                D
                  ? (X.attr("tabindex", D),
                    X.removeAttr("data-wf-tabindex-swap"))
                  : X.removeAttr("tabindex");
              break;
          }
          X.toggleClass("wf-force-outline-none", b === "add");
        }
        function M(X) {
          var b = X.currentTarget;
          if (
            !(
              Di.env("design") ||
              (window.$.mobile && /(?:^|\s)ui-link(?:$|\s)/.test(b.className))
            )
          ) {
            var D = L(b) ? b.hash : "";
            if (D !== "") {
              var G = e(D);
              G.length &&
                (X && (X.preventDefault(), X.stopPropagation()),
                q(D, X),
                window.setTimeout(
                  function () {
                    x(G, function () {
                      A(G, "add"),
                        G.get(0).focus({ preventScroll: !0 }),
                        A(G, "remove");
                    });
                  },
                  X ? 0 : 300
                ));
            }
          }
        }
        function q(X) {
          if (
            r.hash !== X &&
            n &&
            n.pushState &&
            !(Di.env.chrome && r.protocol === "file:")
          ) {
            var b = n.state && n.state.hash;
            b !== X && n.pushState({ hash: X }, "", X);
          }
        }
        function x(X, b) {
          var D = a.scrollTop(),
            G = U(X);
          if (D !== G) {
            var V = H(X, D, G),
              $ = Date.now(),
              J = function () {
                var F = Date.now() - $;
                window.scroll(0, k(D, G, F, V)),
                  F <= V ? s(J) : typeof b == "function" && b();
              };
            s(J);
          }
        }
        function U(X) {
          var b = e(d),
            D = b.css("position") === "fixed" ? b.outerHeight() : 0,
            G = X.offset().top - D;
          if (X.data("scroll") === "mid") {
            var V = a.height() - D,
              $ = X.outerHeight();
            $ < V && (G -= Math.round((V - $) / 2));
          }
          return G;
        }
        function H(X, b, D) {
          if (N()) return 0;
          var G = 1;
          return (
            o.add(X).each(function (V, $) {
              var J = parseFloat($.getAttribute("data-scroll-time"));
              !isNaN(J) && J >= 0 && (G = J);
            }),
            (472.143 * Math.log(Math.abs(b - D) + 125) - 2e3) * G
          );
        }
        function k(X, b, D, G) {
          return D > G ? b : X + (b - X) * re(D / G);
        }
        function re(X) {
          return X < 0.5
            ? 4 * X * X * X
            : (X - 1) * (2 * X - 2) * (2 * X - 2) + 1;
        }
        function Z() {
          var { WF_CLICK_EMPTY: X, WF_CLICK_SCROLL: b } = t;
          i.on(b, p, M),
            i.on(X, v, function (D) {
              D.preventDefault();
            }),
            document.head.insertBefore(I, document.head.firstChild);
        }
        return { ready: Z };
      })
    );
  });
  var cI = u((qK, uI) => {
    var NW = $e();
    NW.define(
      "touch",
      (uI.exports = function (e) {
        var t = {},
          r = window.getSelection;
        (e.event.special.tap = { bindType: "click", delegateType: "click" }),
          (t.init = function (i) {
            return (
              (i = typeof i == "string" ? e(i).get(0) : i), i ? new n(i) : null
            );
          });
        function n(i) {
          var o = !1,
            s = !1,
            c = Math.min(Math.round(window.innerWidth * 0.04), 40),
            d,
            v;
          i.addEventListener("touchstart", p, !1),
            i.addEventListener("touchmove", h, !1),
            i.addEventListener("touchend", I, !1),
            i.addEventListener("touchcancel", m, !1),
            i.addEventListener("mousedown", p, !1),
            i.addEventListener("mousemove", h, !1),
            i.addEventListener("mouseup", I, !1),
            i.addEventListener("mouseout", m, !1);
          function p(L) {
            var C = L.touches;
            (C && C.length > 1) ||
              ((o = !0),
              C ? ((s = !0), (d = C[0].clientX)) : (d = L.clientX),
              (v = d));
          }
          function h(L) {
            if (o) {
              if (s && L.type === "mousemove") {
                L.preventDefault(), L.stopPropagation();
                return;
              }
              var C = L.touches,
                N = C ? C[0].clientX : L.clientX,
                A = N - v;
              (v = N),
                Math.abs(A) > c &&
                  r &&
                  String(r()) === "" &&
                  (a("swipe", L, { direction: A > 0 ? "right" : "left" }), m());
            }
          }
          function I(L) {
            if (o && ((o = !1), s && L.type === "mouseup")) {
              L.preventDefault(), L.stopPropagation(), (s = !1);
              return;
            }
          }
          function m() {
            o = !1;
          }
          function T() {
            i.removeEventListener("touchstart", p, !1),
              i.removeEventListener("touchmove", h, !1),
              i.removeEventListener("touchend", I, !1),
              i.removeEventListener("touchcancel", m, !1),
              i.removeEventListener("mousedown", p, !1),
              i.removeEventListener("mousemove", h, !1),
              i.removeEventListener("mouseup", I, !1),
              i.removeEventListener("mouseout", m, !1),
              (i = null);
          }
          this.destroy = T;
        }
        function a(i, o, s) {
          var c = e.Event(i, { originalEvent: o });
          e(o.target).trigger(c, s);
        }
        return (t.instance = t.init(document)), t;
      })
    );
  });
  var lI = u((bs) => {
    "use strict";
    Object.defineProperty(bs, "__esModule", { value: !0 });
    bs.default = PW;
    function PW(e, t, r, n, a, i, o, s, c, d, v, p, h) {
      return function (I) {
        e(I);
        var m = I.form,
          T = {
            name: m.attr("data-name") || m.attr("name") || "Untitled Form",
            pageId: m.attr("data-wf-page-id") || "",
            elementId: m.attr("data-wf-element-id") || "",
            source: t.href,
            test: r.env(),
            fields: {},
            fileUploads: {},
            dolphin: /pass[\s-_]?(word|code)|secret|login|credentials/i.test(
              m.html()
            ),
            trackingCookies: n(),
          };
        let L = m.attr("data-wf-flow");
        L && (T.wfFlow = L), a(I);
        var C = i(m, T.fields);
        if (C) return o(C);
        if (((T.fileUploads = s(m)), c(I), !d)) {
          v(I);
          return;
        }
        p.ajax({
          url: h,
          type: "POST",
          data: T,
          dataType: "json",
          crossDomain: !0,
        })
          .done(function (N) {
            N && N.code === 200 && (I.success = !0), v(I);
          })
          .fail(function () {
            v(I);
          });
      };
    }
  });
  var dI = u((LK, fI) => {
    var Fi = $e();
    Fi.define(
      "forms",
      (fI.exports = function (e, t) {
        var r = {},
          n = e(document),
          a,
          i = window.location,
          o = window.XDomainRequest && !window.atob,
          s = ".w-form",
          c,
          d = /e(-)?mail/i,
          v = /^\S+@\S+$/,
          p = window.alert,
          h = Fi.env(),
          I,
          m,
          T,
          L = /list-manage[1-9]?.com/i,
          C = t.debounce(function () {
            p(
              "Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue."
            );
          }, 100);
        r.ready =
          r.design =
          r.preview =
            function () {
              N(), !h && !I && M();
            };
        function N() {
          (c = e("html").attr("data-wf-site")),
            (m = "https://webflow.com/api/v1/form/" + c),
            o &&
              m.indexOf("https://webflow.com") >= 0 &&
              (m = m.replace(
                "https://webflow.com",
                "https://formdata.webflow.com"
              )),
            (T = `${m}/signFile`),
            (a = e(s + " form")),
            a.length && a.each(A);
        }
        function A(F, j) {
          var f = e(j),
            g = e.data(j, s);
          g || (g = e.data(j, s, { form: f })), q(g);
          var _ = f.closest("div.w-form");
          (g.done = _.find("> .w-form-done")),
            (g.fail = _.find("> .w-form-fail")),
            (g.fileUploads = _.find(".w-file-upload")),
            g.fileUploads.each(function (z) {
              V(z, g);
            });
          var E =
            g.form.attr("aria-label") || g.form.attr("data-name") || "Form";
          g.done.attr("aria-label") || g.form.attr("aria-label", E),
            g.done.attr("tabindex", "-1"),
            g.done.attr("role", "region"),
            g.done.attr("aria-label") ||
              g.done.attr("aria-label", E + " success"),
            g.fail.attr("tabindex", "-1"),
            g.fail.attr("role", "region"),
            g.fail.attr("aria-label") ||
              g.fail.attr("aria-label", E + " failure");
          var B = (g.action = f.attr("action"));
          if (
            ((g.handler = null),
            (g.redirect = f.attr("data-redirect")),
            L.test(B))
          ) {
            g.handler = b;
            return;
          }
          if (!B) {
            if (c) {
              g.handler = (() => {
                let z = lI().default;
                return z(q, i, Fi, re, G, U, p, H, x, c, D, e, m);
              })();
              return;
            }
            C();
          }
        }
        function M() {
          (I = !0),
            n.on("submit", s + " form", function (z) {
              var Y = e.data(this, s);
              Y.handler && ((Y.evt = z), Y.handler(Y));
            });
          let F = ".w-checkbox-input",
            j = ".w-radio-input",
            f = "w--redirected-checked",
            g = "w--redirected-focus",
            _ = "w--redirected-focus-visible",
            E = ":focus-visible, [data-wf-focus-visible]",
            B = [
              ["checkbox", F],
              ["radio", j],
            ];
          n.on(
            "change",
            s + ' form input[type="checkbox"]:not(' + F + ")",
            (z) => {
              e(z.target).siblings(F).toggleClass(f);
            }
          ),
            n.on("change", s + ' form input[type="radio"]', (z) => {
              e(`input[name="${z.target.name}"]:not(${F})`).map((ue, Ae) =>
                e(Ae).siblings(j).removeClass(f)
              );
              let Y = e(z.target);
              Y.hasClass("w-radio-input") || Y.siblings(j).addClass(f);
            }),
            B.forEach(([z, Y]) => {
              n.on(
                "focus",
                s + ` form input[type="${z}"]:not(` + Y + ")",
                (ue) => {
                  e(ue.target).siblings(Y).addClass(g),
                    e(ue.target).filter(E).siblings(Y).addClass(_);
                }
              ),
                n.on(
                  "blur",
                  s + ` form input[type="${z}"]:not(` + Y + ")",
                  (ue) => {
                    e(ue.target).siblings(Y).removeClass(`${g} ${_}`);
                  }
                );
            });
        }
        function q(F) {
          var j = (F.btn = F.form.find(':input[type="submit"]'));
          (F.wait = F.btn.attr("data-wait") || null),
            (F.success = !1),
            j.prop("disabled", !1),
            F.label && j.val(F.label);
        }
        function x(F) {
          var j = F.btn,
            f = F.wait;
          j.prop("disabled", !0), f && ((F.label = j.val()), j.val(f));
        }
        function U(F, j) {
          var f = null;
          return (
            (j = j || {}),
            F.find(':input:not([type="submit"]):not([type="file"])').each(
              function (g, _) {
                var E = e(_),
                  B = E.attr("type"),
                  z =
                    E.attr("data-name") || E.attr("name") || "Field " + (g + 1),
                  Y = E.val();
                if (B === "checkbox") Y = E.is(":checked");
                else if (B === "radio") {
                  if (j[z] === null || typeof j[z] == "string") return;
                  Y =
                    F.find(
                      'input[name="' + E.attr("name") + '"]:checked'
                    ).val() || null;
                }
                typeof Y == "string" && (Y = e.trim(Y)),
                  (j[z] = Y),
                  (f = f || Z(E, B, z, Y));
              }
            ),
            f
          );
        }
        function H(F) {
          var j = {};
          return (
            F.find(':input[type="file"]').each(function (f, g) {
              var _ = e(g),
                E = _.attr("data-name") || _.attr("name") || "File " + (f + 1),
                B = _.attr("data-value");
              typeof B == "string" && (B = e.trim(B)), (j[E] = B);
            }),
            j
          );
        }
        let k = { _mkto_trk: "marketo" };
        function re() {
          return document.cookie.split("; ").reduce(function (j, f) {
            let g = f.split("="),
              _ = g[0];
            if (_ in k) {
              let E = k[_],
                B = g.slice(1).join("=");
              j[E] = B;
            }
            return j;
          }, {});
        }
        function Z(F, j, f, g) {
          var _ = null;
          return (
            j === "password"
              ? (_ = "Passwords cannot be submitted.")
              : F.attr("required")
              ? g
                ? d.test(F.attr("type")) &&
                  (v.test(g) ||
                    (_ = "Please enter a valid email address for: " + f))
                : (_ = "Please fill out the required field: " + f)
              : f === "g-recaptcha-response" &&
                !g &&
                (_ = "Please confirm you\u2019re not a robot."),
            _
          );
        }
        function X(F) {
          G(F), D(F);
        }
        function b(F) {
          q(F);
          var j = F.form,
            f = {};
          if (/^https/.test(i.href) && !/^https/.test(F.action)) {
            j.attr("method", "post");
            return;
          }
          G(F);
          var g = U(j, f);
          if (g) return p(g);
          x(F);
          var _;
          t.each(f, function (Y, ue) {
            d.test(ue) && (f.EMAIL = Y),
              /^((full[ _-]?)?name)$/i.test(ue) && (_ = Y),
              /^(first[ _-]?name)$/i.test(ue) && (f.FNAME = Y),
              /^(last[ _-]?name)$/i.test(ue) && (f.LNAME = Y);
          }),
            _ &&
              !f.FNAME &&
              ((_ = _.split(" ")),
              (f.FNAME = _[0]),
              (f.LNAME = f.LNAME || _[1]));
          var E = F.action.replace("/post?", "/post-json?") + "&c=?",
            B = E.indexOf("u=") + 2;
          B = E.substring(B, E.indexOf("&", B));
          var z = E.indexOf("id=") + 3;
          (z = E.substring(z, E.indexOf("&", z))),
            (f["b_" + B + "_" + z] = ""),
            e
              .ajax({ url: E, data: f, dataType: "jsonp" })
              .done(function (Y) {
                (F.success = Y.result === "success" || /already/.test(Y.msg)),
                  F.success || console.info("MailChimp error: " + Y.msg),
                  D(F);
              })
              .fail(function () {
                D(F);
              });
        }
        function D(F) {
          var j = F.form,
            f = F.redirect,
            g = F.success;
          if (g && f) {
            Fi.location(f);
            return;
          }
          F.done.toggle(g),
            F.fail.toggle(!g),
            g ? F.done.focus() : F.fail.focus(),
            j.toggle(!g),
            q(F);
        }
        function G(F) {
          F.evt && F.evt.preventDefault(), (F.evt = null);
        }
        function V(F, j) {
          if (!j.fileUploads || !j.fileUploads[F]) return;
          var f,
            g = e(j.fileUploads[F]),
            _ = g.find("> .w-file-upload-default"),
            E = g.find("> .w-file-upload-uploading"),
            B = g.find("> .w-file-upload-success"),
            z = g.find("> .w-file-upload-error"),
            Y = _.find(".w-file-upload-input"),
            ue = _.find(".w-file-upload-label"),
            Ae = ue.children(),
            ce = z.find(".w-file-upload-error-msg"),
            he = B.find(".w-file-upload-file"),
            We = B.find(".w-file-remove-link"),
            Be = he.find(".w-file-upload-file-name"),
            it = ce.attr("data-w-size-error"),
            qe = ce.attr("data-w-type-error"),
            Et = ce.attr("data-w-generic-error");
          if (
            (h ||
              ue.on("click keydown", function (O) {
                (O.type === "keydown" && O.which !== 13 && O.which !== 32) ||
                  (O.preventDefault(), Y.click());
              }),
            ue.find(".w-icon-file-upload-icon").attr("aria-hidden", "true"),
            We.find(".w-icon-file-upload-remove").attr("aria-hidden", "true"),
            h)
          )
            Y.on("click", function (O) {
              O.preventDefault();
            }),
              ue.on("click", function (O) {
                O.preventDefault();
              }),
              Ae.on("click", function (O) {
                O.preventDefault();
              });
          else {
            We.on("click keydown", function (O) {
              if (O.type === "keydown") {
                if (O.which !== 13 && O.which !== 32) return;
                O.preventDefault();
              }
              Y.removeAttr("data-value"),
                Y.val(""),
                Be.html(""),
                _.toggle(!0),
                B.toggle(!1),
                ue.focus();
            }),
              Y.on("change", function (O) {
                (f = O.target && O.target.files && O.target.files[0]),
                  f &&
                    (_.toggle(!1),
                    z.toggle(!1),
                    E.toggle(!0),
                    E.focus(),
                    Be.text(f.name),
                    w() || x(j),
                    (j.fileUploads[F].uploading = !0),
                    $(f, y));
              });
            var kt = ue.outerHeight();
            Y.height(kt), Y.width(1);
          }
          function l(O) {
            var R = O.responseJSON && O.responseJSON.msg,
              K = Et;
            typeof R == "string" && R.indexOf("InvalidFileTypeError") === 0
              ? (K = qe)
              : typeof R == "string" &&
                R.indexOf("MaxFileSizeError") === 0 &&
                (K = it),
              ce.text(K),
              Y.removeAttr("data-value"),
              Y.val(""),
              E.toggle(!1),
              _.toggle(!0),
              z.toggle(!0),
              z.focus(),
              (j.fileUploads[F].uploading = !1),
              w() || q(j);
          }
          function y(O, R) {
            if (O) return l(O);
            var K = R.fileName,
              ee = R.postData,
              pe = R.fileId,
              W = R.s3Url;
            Y.attr("data-value", pe), J(W, ee, f, K, S);
          }
          function S(O) {
            if (O) return l(O);
            E.toggle(!1),
              B.css("display", "inline-block"),
              B.focus(),
              (j.fileUploads[F].uploading = !1),
              w() || q(j);
          }
          function w() {
            var O = (j.fileUploads && j.fileUploads.toArray()) || [];
            return O.some(function (R) {
              return R.uploading;
            });
          }
        }
        function $(F, j) {
          var f = new URLSearchParams({ name: F.name, size: F.size });
          e.ajax({ type: "GET", url: `${T}?${f}`, crossDomain: !0 })
            .done(function (g) {
              j(null, g);
            })
            .fail(function (g) {
              j(g);
            });
        }
        function J(F, j, f, g, _) {
          var E = new FormData();
          for (var B in j) E.append(B, j[B]);
          E.append("file", f, g),
            e
              .ajax({
                type: "POST",
                url: F,
                data: E,
                processData: !1,
                contentType: !1,
              })
              .done(function () {
                _(null);
              })
              .fail(function (z) {
                _(z);
              });
        }
        return r;
      })
    );
  });
  var hI = u((MK, vI) => {
    var qt = $e(),
      qW = ki(),
      ht = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      },
      pI =
        'a[href], area[href], [role="button"], input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]';
    qt.define(
      "slider",
      (vI.exports = function (e, t) {
        var r = {},
          n = e.tram,
          a = e(document),
          i,
          o,
          s = qt.env(),
          c = ".w-slider",
          d = '<div class="w-slider-dot" data-wf-ignore />',
          v =
            '<div aria-live="off" aria-atomic="true" class="w-slider-aria-label" data-wf-ignore />',
          p = "w-slider-force-show",
          h = qW.triggers,
          I,
          m = !1;
        (r.ready = function () {
          (o = qt.env("design")), T();
        }),
          (r.design = function () {
            (o = !0), setTimeout(T, 1e3);
          }),
          (r.preview = function () {
            (o = !1), T();
          }),
          (r.redraw = function () {
            (m = !0), T(), (m = !1);
          }),
          (r.destroy = L);
        function T() {
          (i = a.find(c)), i.length && (i.each(A), !I && (L(), C()));
        }
        function L() {
          qt.resize.off(N), qt.redraw.off(r.redraw);
        }
        function C() {
          qt.resize.on(N), qt.redraw.on(r.redraw);
        }
        function N() {
          i.filter(":visible").each(V);
        }
        function A(f, g) {
          var _ = e(g),
            E = e.data(g, c);
          E ||
            (E = e.data(g, c, {
              index: 0,
              depth: 1,
              hasFocus: { keyboard: !1, mouse: !1 },
              el: _,
              config: {},
            })),
            (E.mask = _.children(".w-slider-mask")),
            (E.left = _.children(".w-slider-arrow-left")),
            (E.right = _.children(".w-slider-arrow-right")),
            (E.nav = _.children(".w-slider-nav")),
            (E.slides = E.mask.children(".w-slide")),
            E.slides.each(h.reset),
            m && (E.maskWidth = 0),
            _.attr("role") === void 0 && _.attr("role", "region"),
            _.attr("aria-label") === void 0 && _.attr("aria-label", "carousel");
          var B = E.mask.attr("id");
          if (
            (B || ((B = "w-slider-mask-" + f), E.mask.attr("id", B)),
            !o && !E.ariaLiveLabel && (E.ariaLiveLabel = e(v).appendTo(E.mask)),
            E.left.attr("role", "button"),
            E.left.attr("tabindex", "0"),
            E.left.attr("aria-controls", B),
            E.left.attr("aria-label") === void 0 &&
              E.left.attr("aria-label", "previous slide"),
            E.right.attr("role", "button"),
            E.right.attr("tabindex", "0"),
            E.right.attr("aria-controls", B),
            E.right.attr("aria-label") === void 0 &&
              E.right.attr("aria-label", "next slide"),
            !n.support.transform)
          ) {
            E.left.hide(), E.right.hide(), E.nav.hide(), (I = !0);
            return;
          }
          E.el.off(c),
            E.left.off(c),
            E.right.off(c),
            E.nav.off(c),
            M(E),
            o
              ? (E.el.on("setting" + c, b(E)), X(E), (E.hasTimer = !1))
              : (E.el.on("swipe" + c, b(E)),
                E.left.on("click" + c, H(E)),
                E.right.on("click" + c, k(E)),
                E.left.on("keydown" + c, U(E, H)),
                E.right.on("keydown" + c, U(E, k)),
                E.nav.on("keydown" + c, "> div", b(E)),
                E.config.autoplay &&
                  !E.hasTimer &&
                  ((E.hasTimer = !0), (E.timerCount = 1), Z(E)),
                E.el.on("mouseenter" + c, x(E, !0, "mouse")),
                E.el.on("focusin" + c, x(E, !0, "keyboard")),
                E.el.on("mouseleave" + c, x(E, !1, "mouse")),
                E.el.on("focusout" + c, x(E, !1, "keyboard"))),
            E.nav.on("click" + c, "> div", b(E)),
            s ||
              E.mask
                .contents()
                .filter(function () {
                  return this.nodeType === 3;
                })
                .remove();
          var z = _.filter(":hidden");
          z.addClass(p);
          var Y = _.parents(":hidden");
          Y.addClass(p), m || V(f, g), z.removeClass(p), Y.removeClass(p);
        }
        function M(f) {
          var g = {};
          (g.crossOver = 0),
            (g.animation = f.el.attr("data-animation") || "slide"),
            g.animation === "outin" &&
              ((g.animation = "cross"), (g.crossOver = 0.5)),
            (g.easing = f.el.attr("data-easing") || "ease");
          var _ = f.el.attr("data-duration");
          if (
            ((g.duration = _ != null ? parseInt(_, 10) : 500),
            q(f.el.attr("data-infinite")) && (g.infinite = !0),
            q(f.el.attr("data-disable-swipe")) && (g.disableSwipe = !0),
            q(f.el.attr("data-hide-arrows"))
              ? (g.hideArrows = !0)
              : f.config.hideArrows && (f.left.show(), f.right.show()),
            q(f.el.attr("data-autoplay")))
          ) {
            (g.autoplay = !0),
              (g.delay = parseInt(f.el.attr("data-delay"), 10) || 2e3),
              (g.timerMax = parseInt(f.el.attr("data-autoplay-limit"), 10));
            var E = "mousedown" + c + " touchstart" + c;
            o ||
              f.el.off(E).one(E, function () {
                X(f);
              });
          }
          var B = f.right.width();
          (g.edge = B ? B + 40 : 100), (f.config = g);
        }
        function q(f) {
          return f === "1" || f === "true";
        }
        function x(f, g, _) {
          return function (E) {
            if (g) f.hasFocus[_] = g;
            else if (
              e.contains(f.el.get(0), E.relatedTarget) ||
              ((f.hasFocus[_] = g),
              (f.hasFocus.mouse && _ === "keyboard") ||
                (f.hasFocus.keyboard && _ === "mouse"))
            )
              return;
            g
              ? (f.ariaLiveLabel.attr("aria-live", "polite"),
                f.hasTimer && X(f))
              : (f.ariaLiveLabel.attr("aria-live", "off"), f.hasTimer && Z(f));
          };
        }
        function U(f, g) {
          return function (_) {
            switch (_.keyCode) {
              case ht.SPACE:
              case ht.ENTER:
                return g(f)(), _.preventDefault(), _.stopPropagation();
            }
          };
        }
        function H(f) {
          return function () {
            G(f, { index: f.index - 1, vector: -1 });
          };
        }
        function k(f) {
          return function () {
            G(f, { index: f.index + 1, vector: 1 });
          };
        }
        function re(f, g) {
          var _ = null;
          g === f.slides.length && (T(), $(f)),
            t.each(f.anchors, function (E, B) {
              e(E.els).each(function (z, Y) {
                e(Y).index() === g && (_ = B);
              });
            }),
            _ != null && G(f, { index: _, immediate: !0 });
        }
        function Z(f) {
          X(f);
          var g = f.config,
            _ = g.timerMax;
          (_ && f.timerCount++ > _) ||
            (f.timerId = window.setTimeout(function () {
              f.timerId == null || o || (k(f)(), Z(f));
            }, g.delay));
        }
        function X(f) {
          window.clearTimeout(f.timerId), (f.timerId = null);
        }
        function b(f) {
          return function (g, _) {
            _ = _ || {};
            var E = f.config;
            if (o && g.type === "setting") {
              if (_.select === "prev") return H(f)();
              if (_.select === "next") return k(f)();
              if ((M(f), $(f), _.select == null)) return;
              re(f, _.select);
              return;
            }
            if (g.type === "swipe")
              return E.disableSwipe || qt.env("editor")
                ? void 0
                : _.direction === "left"
                ? k(f)()
                : _.direction === "right"
                ? H(f)()
                : void 0;
            if (f.nav.has(g.target).length) {
              var B = e(g.target).index();
              if (
                (g.type === "click" && G(f, { index: B }), g.type === "keydown")
              )
                switch (g.keyCode) {
                  case ht.ENTER:
                  case ht.SPACE: {
                    G(f, { index: B }), g.preventDefault();
                    break;
                  }
                  case ht.ARROW_LEFT:
                  case ht.ARROW_UP: {
                    D(f.nav, Math.max(B - 1, 0)), g.preventDefault();
                    break;
                  }
                  case ht.ARROW_RIGHT:
                  case ht.ARROW_DOWN: {
                    D(f.nav, Math.min(B + 1, f.pages)), g.preventDefault();
                    break;
                  }
                  case ht.HOME: {
                    D(f.nav, 0), g.preventDefault();
                    break;
                  }
                  case ht.END: {
                    D(f.nav, f.pages), g.preventDefault();
                    break;
                  }
                  default:
                    return;
                }
            }
          };
        }
        function D(f, g) {
          var _ = f.children().eq(g).focus();
          f.children().not(_);
        }
        function G(f, g) {
          g = g || {};
          var _ = f.config,
            E = f.anchors;
          f.previous = f.index;
          var B = g.index,
            z = {};
          B < 0
            ? ((B = E.length - 1),
              _.infinite &&
                ((z.x = -f.endX), (z.from = 0), (z.to = E[0].width)))
            : B >= E.length &&
              ((B = 0),
              _.infinite &&
                ((z.x = E[E.length - 1].width),
                (z.from = -E[E.length - 1].x),
                (z.to = z.from - z.x))),
            (f.index = B);
          var Y = f.nav
            .children()
            .eq(B)
            .addClass("w-active")
            .attr("aria-pressed", "true")
            .attr("tabindex", "0");
          f.nav
            .children()
            .not(Y)
            .removeClass("w-active")
            .attr("aria-pressed", "false")
            .attr("tabindex", "-1"),
            _.hideArrows &&
              (f.index === E.length - 1 ? f.right.hide() : f.right.show(),
              f.index === 0 ? f.left.hide() : f.left.show());
          var ue = f.offsetX || 0,
            Ae = (f.offsetX = -E[f.index].x),
            ce = { x: Ae, opacity: 1, visibility: "" },
            he = e(E[f.index].els),
            We = e(E[f.previous] && E[f.previous].els),
            Be = f.slides.not(he),
            it = _.animation,
            qe = _.easing,
            Et = Math.round(_.duration),
            kt = g.vector || (f.index > f.previous ? 1 : -1),
            l = "opacity " + Et + "ms " + qe,
            y = "transform " + Et + "ms " + qe;
          if (
            (he.find(pI).removeAttr("tabindex"),
            he.removeAttr("aria-hidden"),
            he.find("*").removeAttr("aria-hidden"),
            Be.find(pI).attr("tabindex", "-1"),
            Be.attr("aria-hidden", "true"),
            Be.find("*").attr("aria-hidden", "true"),
            o || (he.each(h.intro), Be.each(h.outro)),
            g.immediate && !m)
          ) {
            n(he).set(ce), O();
            return;
          }
          if (f.index === f.previous) return;
          if (
            (o || f.ariaLiveLabel.text(`Slide ${B + 1} of ${E.length}.`),
            it === "cross")
          ) {
            var S = Math.round(Et - Et * _.crossOver),
              w = Math.round(Et - S);
            (l = "opacity " + S + "ms " + qe),
              n(We).set({ visibility: "" }).add(l).start({ opacity: 0 }),
              n(he)
                .set({ visibility: "", x: Ae, opacity: 0, zIndex: f.depth++ })
                .add(l)
                .wait(w)
                .then({ opacity: 1 })
                .then(O);
            return;
          }
          if (it === "fade") {
            n(We).set({ visibility: "" }).stop(),
              n(he)
                .set({ visibility: "", x: Ae, opacity: 0, zIndex: f.depth++ })
                .add(l)
                .start({ opacity: 1 })
                .then(O);
            return;
          }
          if (it === "over") {
            (ce = { x: f.endX }),
              n(We).set({ visibility: "" }).stop(),
              n(he)
                .set({
                  visibility: "",
                  zIndex: f.depth++,
                  x: Ae + E[f.index].width * kt,
                })
                .add(y)
                .start({ x: Ae })
                .then(O);
            return;
          }
          _.infinite && z.x
            ? (n(f.slides.not(We))
                .set({ visibility: "", x: z.x })
                .add(y)
                .start({ x: Ae }),
              n(We)
                .set({ visibility: "", x: z.from })
                .add(y)
                .start({ x: z.to }),
              (f.shifted = We))
            : (_.infinite &&
                f.shifted &&
                (n(f.shifted).set({ visibility: "", x: ue }),
                (f.shifted = null)),
              n(f.slides).set({ visibility: "" }).add(y).start({ x: Ae }));
          function O() {
            (he = e(E[f.index].els)),
              (Be = f.slides.not(he)),
              it !== "slide" && (ce.visibility = "hidden"),
              n(Be).set(ce);
          }
        }
        function V(f, g) {
          var _ = e.data(g, c);
          if (_) {
            if (F(_)) return $(_);
            o && j(_) && $(_);
          }
        }
        function $(f) {
          var g = 1,
            _ = 0,
            E = 0,
            B = 0,
            z = f.maskWidth,
            Y = z - f.config.edge;
          Y < 0 && (Y = 0),
            (f.anchors = [{ els: [], x: 0, width: 0 }]),
            f.slides.each(function (Ae, ce) {
              E - _ > Y &&
                (g++,
                (_ += z),
                (f.anchors[g - 1] = { els: [], x: E, width: 0 })),
                (B = e(ce).outerWidth(!0)),
                (E += B),
                (f.anchors[g - 1].width += B),
                f.anchors[g - 1].els.push(ce);
              var he = Ae + 1 + " of " + f.slides.length;
              e(ce).attr("aria-label", he), e(ce).attr("role", "group");
            }),
            (f.endX = E),
            o && (f.pages = null),
            f.nav.length && f.pages !== g && ((f.pages = g), J(f));
          var ue = f.index;
          ue >= g && (ue = g - 1), G(f, { immediate: !0, index: ue });
        }
        function J(f) {
          var g = [],
            _,
            E = f.el.attr("data-nav-spacing");
          E && (E = parseFloat(E) + "px");
          for (var B = 0, z = f.pages; B < z; B++)
            (_ = e(d)),
              _.attr("aria-label", "Show slide " + (B + 1) + " of " + z)
                .attr("aria-pressed", "false")
                .attr("role", "button")
                .attr("tabindex", "-1"),
              f.nav.hasClass("w-num") && _.text(B + 1),
              E != null && _.css({ "margin-left": E, "margin-right": E }),
              g.push(_);
          f.nav.empty().append(g);
        }
        function F(f) {
          var g = f.mask.width();
          return f.maskWidth !== g ? ((f.maskWidth = g), !0) : !1;
        }
        function j(f) {
          var g = 0;
          return (
            f.slides.each(function (_, E) {
              g += e(E).outerWidth(!0);
            }),
            f.slidesWidth !== g ? ((f.slidesWidth = g), !0) : !1
          );
        }
        return r;
      })
    );
  });
  Fs();
  Xs();
  Vs();
  js();
  ki();
  nI();
  aI();
  sI();
  cI();
  dI();
  hI();
})();
/*!
 * tram.js v0.8.2-global
 * Cross-browser CSS3 transitions in JavaScript
 * https://github.com/bkwld/tram
 * MIT License
 */
/*!
 * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
 * _.each
 * _.map
 * _.find
 * _.filter
 * _.any
 * _.contains
 * _.delay
 * _.defer
 * _.throttle (webflow)
 * _.debounce
 * _.keys
 * _.has
 * _.now
 * _.template (webflow: upgraded to 1.13.6)
 *
 * http://underscorejs.org
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Underscore may be freely distributed under the MIT license.
 * @license MIT
 */
/*! Bundled license information:

timm/lib/timm.js:
  (*!
   * Timm
   *
   * Immutability helpers with fast reads and acceptable writes.
   *
   * @copyright Guillermo Grau Panea 2016
   * @license MIT
   *)
*/
/**
 * ----------------------------------------------------------------------
 * Webflow: Interactions 2.0: Init
 */
Webflow.require("ix2").init({
  events: {
    e: {
      id: "e",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c7878ea5e3e133429ab75b|15282d30-8f3a-e133-1f30-d41bf6cc7376",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c7878ea5e3e133429ab75b|15282d30-8f3a-e133-1f30-d41bf6cc7376",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-p",
          smoothing: 90,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1690808307535,
    },
    "e-2": {
      id: "e-2",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-2", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c7878ea5e3e133429ab75b|1ab2bc20-7d38-ca7f-1385-cad2662dca3f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c7878ea5e3e133429ab75b|1ab2bc20-7d38-ca7f-1385-cad2662dca3f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-2-p",
          smoothing: 90,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1691408550717,
    },
    "e-3": {
      id: "e-3",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-3", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c7878ea5e3e133429ab75b",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c7878ea5e3e133429ab75b",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-3-p",
          selectedAxis: "X_AXIS",
          basedOn: "VIEWPORT",
          reverse: false,
          smoothing: 70,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-3-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "VIEWPORT",
          reverse: false,
          smoothing: 70,
          restingState: 50,
        },
      ],
      createdOn: 1691757587228,
    },
    "e-4": {
      id: "e-4",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-5",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".project-link",
        originalId:
          "64c7878ea5e3e133429ab75b|c9819c38-1ba7-c10d-ddf4-0fb65f342f23",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".project-link",
          originalId:
            "64c7878ea5e3e133429ab75b|c9819c38-1ba7-c10d-ddf4-0fb65f342f23",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691757694407,
    },
    "e-5": {
      id: "e-5",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-4",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".project-link",
        originalId:
          "64c7878ea5e3e133429ab75b|c9819c38-1ba7-c10d-ddf4-0fb65f342f23",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".project-link",
          originalId:
            "64c7878ea5e3e133429ab75b|c9819c38-1ba7-c10d-ddf4-0fb65f342f23",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691757694407,
    },
    "e-13": {
      id: "e-13",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-38", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["tiny"],
      target: {
        id: "64df39521a7c64b2d03bf28e|b8f5f18c-210d-f67c-6fd4-67794aa872e6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64df39521a7c64b2d03bf28e|b8f5f18c-210d-f67c-6fd4-67794aa872e6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-38-p",
          smoothing: 60,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1692353461802,
    },
    "e-18": {
      id: "e-18",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-8", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64df39521a7c64b2d03bf28e|f263c1a4-6e16-0b14-9c85-42ede2c5afd8",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64df39521a7c64b2d03bf28e|f263c1a4-6e16-0b14-9c85-42ede2c5afd8",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-8-p",
          smoothing: 80,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1692703500926,
    },
    "e-19": {
      id: "e-19",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-9", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main"],
      target: {
        id: "64df39521a7c64b2d03bf28e|41e6268f-5ba9-0075-cd6d-c42d0bd76a73",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64df39521a7c64b2d03bf28e|41e6268f-5ba9-0075-cd6d-c42d0bd76a73",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-9-p",
          smoothing: 80,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1692710563374,
    },
    "e-20": {
      id: "e-20",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-10", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main"],
      target: {
        id: "64df39521a7c64b2d03bf28e|faf2bbb4-b3e9-aa82-c740-41102a5df113",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64df39521a7c64b2d03bf28e|faf2bbb4-b3e9-aa82-c740-41102a5df113",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-10-p",
          smoothing: 80,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1692715200555,
    },
    "e-21": {
      id: "e-21",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-11", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "64e5cd2af0a5974ee6335d5e|7a3ab16b-bea1-5aea-e7ff-c4bf25c1f68e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e5cd2af0a5974ee6335d5e|7a3ab16b-bea1-5aea-e7ff-c4bf25c1f68e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-11-p",
          smoothing: 80,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1692784114526,
    },
    "e-22": {
      id: "e-22",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-23",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "64e5cd2af0a5974ee6335d5e|4f78cfcd-5bc5-8798-6654-286ca5b8e836",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e5cd2af0a5974ee6335d5e|4f78cfcd-5bc5-8798-6654-286ca5b8e836",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692792166379,
    },
    "e-23": {
      id: "e-23",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-22",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "64e5cd2af0a5974ee6335d5e|4f78cfcd-5bc5-8798-6654-286ca5b8e836",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e5cd2af0a5974ee6335d5e|4f78cfcd-5bc5-8798-6654-286ca5b8e836",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692792166380,
    },
    "e-24": {
      id: "e-24",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-14",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-25",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64d0d3cb5f4d0385b71fd0f1|d8452a79-a290-653a-4945-0263ab616827",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64d0d3cb5f4d0385b71fd0f1|d8452a79-a290-653a-4945-0263ab616827",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692864978290,
    },
    "e-26": {
      id: "e-26",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-15", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "64d0d3cb5f4d0385b71fd0f1|df8c7b09-e948-e856-9385-5893a13d5f7a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64d0d3cb5f4d0385b71fd0f1|df8c7b09-e948-e856-9385-5893a13d5f7a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-15-p",
          smoothing: 80,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1692868865879,
    },
    "e-28": {
      id: "e-28",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-16",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-29",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64d0d3cb5f4d0385b71fd0f1",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64d0d3cb5f4d0385b71fd0f1",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692874622938,
    },
    "e-30": {
      id: "e-30",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64da0a444323314c87820823|4e76fc91-9ec9-44a8-8dd1-aa05bf61d410",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64da0a444323314c87820823|4e76fc91-9ec9-44a8-8dd1-aa05bf61d410",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-p",
          smoothing: 90,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1692881358358,
    },
    "e-31": {
      id: "e-31",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-6", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "64da0a444323314c87820823|dd05b9d4-8b5d-26f6-9a21-5d6cf51bcdc0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64da0a444323314c87820823|dd05b9d4-8b5d-26f6-9a21-5d6cf51bcdc0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-6-p",
          smoothing: 80,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1692884259036,
    },
    "e-32": {
      id: "e-32",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-6", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "64c7878ea5e3e133429ab75b|f3b36af1-5edf-d3b3-2326-1b5ba06400b4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c7878ea5e3e133429ab75b|f3b36af1-5edf-d3b3-2326-1b5ba06400b4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-6-p",
          smoothing: 80,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1692885192891,
    },
    "e-33": {
      id: "e-33",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-17",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-34",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c7878ea5e3e133429ab75b|ae160868-4a12-6d01-9cb8-41fe8e437675",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c7878ea5e3e133429ab75b|ae160868-4a12-6d01-9cb8-41fe8e437675",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692971643991,
    },
    "e-34": {
      id: "e-34",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-18",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-33",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c7878ea5e3e133429ab75b|ae160868-4a12-6d01-9cb8-41fe8e437675",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c7878ea5e3e133429ab75b|ae160868-4a12-6d01-9cb8-41fe8e437675",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1692971643992,
    },
    "e-35": {
      id: "e-35",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-19", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".footer",
        originalId:
          "64c7878ea5e3e133429ab75b|15ba1bc2-3d6d-012f-ac08-f97c4cfcbc22",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".footer",
          originalId:
            "64c7878ea5e3e133429ab75b|15ba1bc2-3d6d-012f-ac08-f97c4cfcbc22",
          appliesTo: "CLASS",
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-19-p",
          smoothing: 90,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1692974393433,
    },
    "e-36": {
      id: "e-36",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-20", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64e8c2c131aebebe5dde82ec|d0f377a2-6dc0-832c-e922-45a8ba9b8734",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e8c2c131aebebe5dde82ec|d0f377a2-6dc0-832c-e922-45a8ba9b8734",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-20-p",
          smoothing: 90,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1692977536798,
    },
    "e-37": {
      id: "e-37",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-21",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-38",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64e9cb0a19b1e5258e55244c",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e9cb0a19b1e5258e55244c",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693045587339,
    },
    "e-39": {
      id: "e-39",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-22",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-40",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".link-wrapper",
        originalId:
          "64c7878ea5e3e133429ab75b|ae160868-4a12-6d01-9cb8-41fe8e43766d",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".link-wrapper",
          originalId:
            "64c7878ea5e3e133429ab75b|ae160868-4a12-6d01-9cb8-41fe8e43766d",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693386863925,
    },
    "e-40": {
      id: "e-40",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-23",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-39",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".link-wrapper",
        originalId:
          "64c7878ea5e3e133429ab75b|ae160868-4a12-6d01-9cb8-41fe8e43766d",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".link-wrapper",
          originalId:
            "64c7878ea5e3e133429ab75b|ae160868-4a12-6d01-9cb8-41fe8e43766d",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693386863926,
    },
    "e-41": {
      id: "e-41",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-42",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".button",
        originalId:
          "64c7878ea5e3e133429ab75b|ae160868-4a12-6d01-9cb8-41fe8e437672",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".button",
          originalId:
            "64c7878ea5e3e133429ab75b|ae160868-4a12-6d01-9cb8-41fe8e437672",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693387290815,
    },
    "e-42": {
      id: "e-42",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-41",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        selector: ".button",
        originalId:
          "64c7878ea5e3e133429ab75b|ae160868-4a12-6d01-9cb8-41fe8e437672",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".button",
          originalId:
            "64c7878ea5e3e133429ab75b|ae160868-4a12-6d01-9cb8-41fe8e437672",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693387290816,
    },
    "e-43": {
      id: "e-43",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-44",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c7878ea5e3e133429ab75b|48e920ec-de85-0fb2-4cb2-fbd41d595d1f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c7878ea5e3e133429ab75b|48e920ec-de85-0fb2-4cb2-fbd41d595d1f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693387800065,
    },
    "e-44": {
      id: "e-44",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-27",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-43",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c7878ea5e3e133429ab75b|48e920ec-de85-0fb2-4cb2-fbd41d595d1f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c7878ea5e3e133429ab75b|48e920ec-de85-0fb2-4cb2-fbd41d595d1f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693387800066,
    },
    "e-45": {
      id: "e-45",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-46",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c7878ea5e3e133429ab75b|9f163782-0761-700d-0443-ad42462bf073",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c7878ea5e3e133429ab75b|9f163782-0761-700d-0443-ad42462bf073",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693388440125,
    },
    "e-46": {
      id: "e-46",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-29",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-45",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c7878ea5e3e133429ab75b|9f163782-0761-700d-0443-ad42462bf073",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c7878ea5e3e133429ab75b|9f163782-0761-700d-0443-ad42462bf073",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693388440126,
    },
    "e-47": {
      id: "e-47",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-48",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c7878ea5e3e133429ab75b|9f163782-0761-700d-0443-ad42462bf071",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c7878ea5e3e133429ab75b|9f163782-0761-700d-0443-ad42462bf071",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693388497555,
    },
    "e-48": {
      id: "e-48",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-47",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c7878ea5e3e133429ab75b|9f163782-0761-700d-0443-ad42462bf071",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c7878ea5e3e133429ab75b|9f163782-0761-700d-0443-ad42462bf071",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693388497557,
    },
    "e-49": {
      id: "e-49",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-32",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-50",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64df39521a7c64b2d03bf28e|0ac766eb-9452-635d-3061-85c0207911ed",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64df39521a7c64b2d03bf28e|0ac766eb-9452-635d-3061-85c0207911ed",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693388909291,
    },
    "e-50": {
      id: "e-50",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-33",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-49",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64df39521a7c64b2d03bf28e|0ac766eb-9452-635d-3061-85c0207911ed",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64df39521a7c64b2d03bf28e|0ac766eb-9452-635d-3061-85c0207911ed",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693388909292,
    },
    "e-51": {
      id: "e-51",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-6", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "64ef075eb77215711c3cae91|36633834-cc51-10c8-03ed-a879d882237b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64ef075eb77215711c3cae91|36633834-cc51-10c8-03ed-a879d882237b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-6-p",
          smoothing: 80,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1693470986126,
    },
    "e-52": {
      id: "e-52",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-34", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64ef075eb77215711c3cae91|2fa94338-4bf0-41a0-ab50-cadaba163305",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64ef075eb77215711c3cae91|2fa94338-4bf0-41a0-ab50-cadaba163305",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-34-p",
          smoothing: 80,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1693475579516,
    },
    "e-53": {
      id: "e-53",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-35", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "64ef075eb77215711c3cae91|d65b2e44-a8e9-1318-9c02-09723870bea4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64ef075eb77215711c3cae91|d65b2e44-a8e9-1318-9c02-09723870bea4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-35-p",
          smoothing: 80,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1693475733667,
    },
    "e-54": {
      id: "e-54",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-17",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-55",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64df39521a7c64b2d03bf28e|7061628d-011d-cc27-1a9c-88c133fd26e5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64df39521a7c64b2d03bf28e|7061628d-011d-cc27-1a9c-88c133fd26e5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693477430452,
    },
    "e-55": {
      id: "e-55",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-18",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-54",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64df39521a7c64b2d03bf28e|7061628d-011d-cc27-1a9c-88c133fd26e5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64df39521a7c64b2d03bf28e|7061628d-011d-cc27-1a9c-88c133fd26e5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693477430452,
    },
    "e-56": {
      id: "e-56",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-17",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-57",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64e5cd2af0a5974ee6335d5e|3588fa0b-111a-efcd-aa40-ab65e26c6361",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e5cd2af0a5974ee6335d5e|3588fa0b-111a-efcd-aa40-ab65e26c6361",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693477477992,
    },
    "e-57": {
      id: "e-57",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-18",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-56",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64e5cd2af0a5974ee6335d5e|3588fa0b-111a-efcd-aa40-ab65e26c6361",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e5cd2af0a5974ee6335d5e|3588fa0b-111a-efcd-aa40-ab65e26c6361",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693477477992,
    },
    "e-58": {
      id: "e-58",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-17",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-59",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64e8c2c131aebebe5dde82ec|a3ed6c40-c22a-4cf9-8d48-62c101bbf40e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e8c2c131aebebe5dde82ec|a3ed6c40-c22a-4cf9-8d48-62c101bbf40e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693477809306,
    },
    "e-59": {
      id: "e-59",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-18",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-58",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64e8c2c131aebebe5dde82ec|a3ed6c40-c22a-4cf9-8d48-62c101bbf40e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e8c2c131aebebe5dde82ec|a3ed6c40-c22a-4cf9-8d48-62c101bbf40e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693477809306,
    },
    "e-60": {
      id: "e-60",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-17",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-61",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64ef075eb77215711c3cae91|e97c5ff3-b9ae-55c4-2d9c-0bb12afcd8ad",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64ef075eb77215711c3cae91|e97c5ff3-b9ae-55c4-2d9c-0bb12afcd8ad",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693477854092,
    },
    "e-61": {
      id: "e-61",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-18",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-60",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64ef075eb77215711c3cae91|e97c5ff3-b9ae-55c4-2d9c-0bb12afcd8ad",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64ef075eb77215711c3cae91|e97c5ff3-b9ae-55c4-2d9c-0bb12afcd8ad",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693477854092,
    },
    "e-62": {
      id: "e-62",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-17",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-63",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64e9d3c98f3236f85be58cf3|f7665881-2bb5-c2c6-5240-c1eb992f53f9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e9d3c98f3236f85be58cf3|f7665881-2bb5-c2c6-5240-c1eb992f53f9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693477886817,
    },
    "e-63": {
      id: "e-63",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-18",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-62",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64e9d3c98f3236f85be58cf3|f7665881-2bb5-c2c6-5240-c1eb992f53f9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e9d3c98f3236f85be58cf3|f7665881-2bb5-c2c6-5240-c1eb992f53f9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693477886817,
    },
    "e-64": {
      id: "e-64",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-17",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-65",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64ef1718379fd1507eb44eee|914b440f-d833-559b-8b4d-27be81d9da5b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64ef1718379fd1507eb44eee|914b440f-d833-559b-8b4d-27be81d9da5b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693477947460,
    },
    "e-65": {
      id: "e-65",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-18",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-64",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64ef1718379fd1507eb44eee|914b440f-d833-559b-8b4d-27be81d9da5b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64ef1718379fd1507eb44eee|914b440f-d833-559b-8b4d-27be81d9da5b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693477947460,
    },
    "e-66": {
      id: "e-66",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-17",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-67",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64ef171ff7aafadaf79c4ad9|1e1475b0-5498-21e7-c83d-7e1db61a0841",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64ef171ff7aafadaf79c4ad9|1e1475b0-5498-21e7-c83d-7e1db61a0841",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693477985089,
    },
    "e-67": {
      id: "e-67",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-18",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-66",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64ef171ff7aafadaf79c4ad9|1e1475b0-5498-21e7-c83d-7e1db61a0841",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64ef171ff7aafadaf79c4ad9|1e1475b0-5498-21e7-c83d-7e1db61a0841",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693477985089,
    },
    "e-68": {
      id: "e-68",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-17",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-69",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64da0a444323314c87820823|6d6e1b06-23e3-7080-8e60-d0798f073d4c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64da0a444323314c87820823|6d6e1b06-23e3-7080-8e60-d0798f073d4c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693478003658,
    },
    "e-69": {
      id: "e-69",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-18",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-68",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64da0a444323314c87820823|6d6e1b06-23e3-7080-8e60-d0798f073d4c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64da0a444323314c87820823|6d6e1b06-23e3-7080-8e60-d0798f073d4c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693478003658,
    },
    "e-70": {
      id: "e-70",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-17",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-71",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64d0d3cb5f4d0385b71fd0f1|1fba63cc-09fc-dd47-5d74-fc98c00c3a27",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64d0d3cb5f4d0385b71fd0f1|1fba63cc-09fc-dd47-5d74-fc98c00c3a27",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693478073266,
    },
    "e-71": {
      id: "e-71",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-18",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-70",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64d0d3cb5f4d0385b71fd0f1|1fba63cc-09fc-dd47-5d74-fc98c00c3a27",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64d0d3cb5f4d0385b71fd0f1|1fba63cc-09fc-dd47-5d74-fc98c00c3a27",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693478073266,
    },
    "e-72": {
      id: "e-72",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-17",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-73",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64e9cb0a19b1e5258e55244c|7d525369-11d9-e0fa-a4ba-8bfbbc5c316c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e9cb0a19b1e5258e55244c|7d525369-11d9-e0fa-a4ba-8bfbbc5c316c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693478100961,
    },
    "e-73": {
      id: "e-73",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_SECOND_CLICK",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-18",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-72",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64e9cb0a19b1e5258e55244c|7d525369-11d9-e0fa-a4ba-8bfbbc5c316c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e9cb0a19b1e5258e55244c|7d525369-11d9-e0fa-a4ba-8bfbbc5c316c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693478100961,
    },
    "e-74": {
      id: "e-74",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-75",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c7878ea5e3e133429ab75b|cbabbe8f-9613-f8cb-e7bf-05c752dc3a24",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c7878ea5e3e133429ab75b|cbabbe8f-9613-f8cb-e7bf-05c752dc3a24",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693482428450,
    },
    "e-75": {
      id: "e-75",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-74",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c7878ea5e3e133429ab75b|cbabbe8f-9613-f8cb-e7bf-05c752dc3a24",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c7878ea5e3e133429ab75b|cbabbe8f-9613-f8cb-e7bf-05c752dc3a24",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693482428451,
    },
    "e-76": {
      id: "e-76",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-77",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c7878ea5e3e133429ab75b",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c7878ea5e3e133429ab75b",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693483219690,
    },
    "e-77": {
      id: "e-77",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-36",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-76",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c7878ea5e3e133429ab75b",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c7878ea5e3e133429ab75b",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693483219691,
    },
    "e-80": {
      id: "e-80",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-7", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small"],
      target: {
        id: "64df39521a7c64b2d03bf28e|b8f5f18c-210d-f67c-6fd4-67794aa872e6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64df39521a7c64b2d03bf28e|b8f5f18c-210d-f67c-6fd4-67794aa872e6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-7-p",
          smoothing: 60,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1693557924152,
    },
    "e-81": {
      id: "e-81",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-82",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c7878ea5e3e133429ab75b|15282d30-8f3a-e133-1f30-d41bf6cc7376",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c7878ea5e3e133429ab75b|15282d30-8f3a-e133-1f30-d41bf6cc7376",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693817721667,
    },
    "e-82": {
      id: "e-82",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_OUT_OF_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-81",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c7878ea5e3e133429ab75b|15282d30-8f3a-e133-1f30-d41bf6cc7376",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c7878ea5e3e133429ab75b|15282d30-8f3a-e133-1f30-d41bf6cc7376",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693817721668,
    },
    "e-87": {
      id: "e-87",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-88",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64df39521a7c64b2d03bf28e",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64df39521a7c64b2d03bf28e",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693818953069,
    },
    "e-88": {
      id: "e-88",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-36",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-87",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64df39521a7c64b2d03bf28e",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64df39521a7c64b2d03bf28e",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693818953071,
    },
    "e-89": {
      id: "e-89",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-90",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64df39521a7c64b2d03bf28e|b8f5f18c-210d-f67c-6fd4-67794aa872e6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64df39521a7c64b2d03bf28e|b8f5f18c-210d-f67c-6fd4-67794aa872e6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693819147672,
    },
    "e-90": {
      id: "e-90",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_OUT_OF_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-89",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64df39521a7c64b2d03bf28e|b8f5f18c-210d-f67c-6fd4-67794aa872e6",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64df39521a7c64b2d03bf28e|b8f5f18c-210d-f67c-6fd4-67794aa872e6",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693819147674,
    },
    "e-93": {
      id: "e-93",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-94",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64e5cd2af0a5974ee6335d5e",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e5cd2af0a5974ee6335d5e",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693819231114,
    },
    "e-94": {
      id: "e-94",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-36",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-93",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64e5cd2af0a5974ee6335d5e",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e5cd2af0a5974ee6335d5e",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693819231115,
    },
    "e-99": {
      id: "e-99",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-100",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64e8c2c131aebebe5dde82ec",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e8c2c131aebebe5dde82ec",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693819416312,
    },
    "e-100": {
      id: "e-100",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-36",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-99",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64e8c2c131aebebe5dde82ec",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e8c2c131aebebe5dde82ec",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693819416314,
    },
    "e-101": {
      id: "e-101",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-102",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64e8c2c131aebebe5dde82ec|80f75aac-1c33-8d8e-6ede-52280e64fa37",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e8c2c131aebebe5dde82ec|80f75aac-1c33-8d8e-6ede-52280e64fa37",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693819505921,
    },
    "e-102": {
      id: "e-102",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_OUT_OF_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-101",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64e8c2c131aebebe5dde82ec|80f75aac-1c33-8d8e-6ede-52280e64fa37",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e8c2c131aebebe5dde82ec|80f75aac-1c33-8d8e-6ede-52280e64fa37",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693819505922,
    },
    "e-105": {
      id: "e-105",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-106",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64ef075eb77215711c3cae91",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64ef075eb77215711c3cae91",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693819609105,
    },
    "e-106": {
      id: "e-106",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-36",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-105",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64ef075eb77215711c3cae91",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64ef075eb77215711c3cae91",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693819609107,
    },
    "e-111": {
      id: "e-111",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-112",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64e9d3c98f3236f85be58cf3",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e9d3c98f3236f85be58cf3",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693819795311,
    },
    "e-112": {
      id: "e-112",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-36",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-111",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64e9d3c98f3236f85be58cf3",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e9d3c98f3236f85be58cf3",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693819795314,
    },
    "e-115": {
      id: "e-115",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-116",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64ef075eb77215711c3cae91|8832861b-aa6b-f3ec-d1e5-96e3b470229e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64ef075eb77215711c3cae91|8832861b-aa6b-f3ec-d1e5-96e3b470229e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693819859072,
    },
    "e-116": {
      id: "e-116",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_OUT_OF_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-115",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64ef075eb77215711c3cae91|8832861b-aa6b-f3ec-d1e5-96e3b470229e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64ef075eb77215711c3cae91|8832861b-aa6b-f3ec-d1e5-96e3b470229e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693819859074,
    },
    "e-117": {
      id: "e-117",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-118",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64e5cd2af0a5974ee6335d5e|f4e89e7a-c034-b9ed-1cbb-ce23c1e8de8b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e5cd2af0a5974ee6335d5e|f4e89e7a-c034-b9ed-1cbb-ce23c1e8de8b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693819919789,
    },
    "e-118": {
      id: "e-118",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_OUT_OF_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-117",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64e5cd2af0a5974ee6335d5e|f4e89e7a-c034-b9ed-1cbb-ce23c1e8de8b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e5cd2af0a5974ee6335d5e|f4e89e7a-c034-b9ed-1cbb-ce23c1e8de8b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693819919790,
    },
    "e-121": {
      id: "e-121",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-122",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64da0a444323314c87820823",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64da0a444323314c87820823",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693819964619,
    },
    "e-122": {
      id: "e-122",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-36",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-121",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64da0a444323314c87820823",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64da0a444323314c87820823",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693819964661,
    },
    "e-123": {
      id: "e-123",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-124",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64da0a444323314c87820823|4e76fc91-9ec9-44a8-8dd1-aa05bf61d40f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64da0a444323314c87820823|4e76fc91-9ec9-44a8-8dd1-aa05bf61d40f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693819984331,
    },
    "e-124": {
      id: "e-124",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_OUT_OF_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-123",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64da0a444323314c87820823|4e76fc91-9ec9-44a8-8dd1-aa05bf61d40f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64da0a444323314c87820823|4e76fc91-9ec9-44a8-8dd1-aa05bf61d40f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693819984333,
    },
    "e-127": {
      id: "e-127",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_UP",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-37",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-128",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64d0d3cb5f4d0385b71fd0f1",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64d0d3cb5f4d0385b71fd0f1",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693820098736,
    },
    "e-128": {
      id: "e-128",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_SCROLL_DOWN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-36",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-127",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64d0d3cb5f4d0385b71fd0f1",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64d0d3cb5f4d0385b71fd0f1",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693820098738,
    },
    "e-129": {
      id: "e-129",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-130",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64d0d3cb5f4d0385b71fd0f1|d8452a79-a290-653a-4945-0263ab616827",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64d0d3cb5f4d0385b71fd0f1|d8452a79-a290-653a-4945-0263ab616827",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693820124175,
    },
    "e-130": {
      id: "e-130",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_OUT_OF_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-129",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64d0d3cb5f4d0385b71fd0f1|d8452a79-a290-653a-4945-0263ab616827",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64d0d3cb5f4d0385b71fd0f1|d8452a79-a290-653a-4945-0263ab616827",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693820124177,
    },
    "e-131": {
      id: "e-131",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-39",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-132",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64e9d3c98f3236f85be58cf3|f29b56d5-a712-1d83-f3f2-0f6ff69c5cab",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e9d3c98f3236f85be58cf3|f29b56d5-a712-1d83-f3f2-0f6ff69c5cab",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693820684112,
    },
    "e-132": {
      id: "e-132",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_OUT_OF_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-40",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-131",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64e9d3c98f3236f85be58cf3|f29b56d5-a712-1d83-f3f2-0f6ff69c5cab",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e9d3c98f3236f85be58cf3|f29b56d5-a712-1d83-f3f2-0f6ff69c5cab",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693820684152,
    },
    "e-133": {
      id: "e-133",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-134",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64df39521a7c64b2d03bf28e|7789f2df-68d8-857a-f633-ad7dfd38bf7f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64df39521a7c64b2d03bf28e|7789f2df-68d8-857a-f633-ad7dfd38bf7f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693987802987,
    },
    "e-134": {
      id: "e-134",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-133",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64df39521a7c64b2d03bf28e|7789f2df-68d8-857a-f633-ad7dfd38bf7f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64df39521a7c64b2d03bf28e|7789f2df-68d8-857a-f633-ad7dfd38bf7f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693987802987,
    },
    "e-135": {
      id: "e-135",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-136",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64e5cd2af0a5974ee6335d5e|2063fd8b-ddf7-2ec4-e3f5-ba98d52a54fb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e5cd2af0a5974ee6335d5e|2063fd8b-ddf7-2ec4-e3f5-ba98d52a54fb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693987894052,
    },
    "e-136": {
      id: "e-136",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-135",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64e5cd2af0a5974ee6335d5e|2063fd8b-ddf7-2ec4-e3f5-ba98d52a54fb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e5cd2af0a5974ee6335d5e|2063fd8b-ddf7-2ec4-e3f5-ba98d52a54fb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693987894052,
    },
    "e-137": {
      id: "e-137",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-138",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64e8c2c131aebebe5dde82ec|0801f06c-06fd-607a-29d0-f0b81cb27808",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e8c2c131aebebe5dde82ec|0801f06c-06fd-607a-29d0-f0b81cb27808",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693987915812,
    },
    "e-138": {
      id: "e-138",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-137",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64e8c2c131aebebe5dde82ec|0801f06c-06fd-607a-29d0-f0b81cb27808",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e8c2c131aebebe5dde82ec|0801f06c-06fd-607a-29d0-f0b81cb27808",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693987915812,
    },
    "e-139": {
      id: "e-139",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-140",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64ef075eb77215711c3cae91|b6f5e9dd-8f1a-6ede-8176-90b867014f34",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64ef075eb77215711c3cae91|b6f5e9dd-8f1a-6ede-8176-90b867014f34",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693987926729,
    },
    "e-140": {
      id: "e-140",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-139",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64ef075eb77215711c3cae91|b6f5e9dd-8f1a-6ede-8176-90b867014f34",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64ef075eb77215711c3cae91|b6f5e9dd-8f1a-6ede-8176-90b867014f34",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693987926729,
    },
    "e-141": {
      id: "e-141",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-142",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64e9d3c98f3236f85be58cf3|9ec4c17b-e2fe-be78-98ef-117d74804167",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e9d3c98f3236f85be58cf3|9ec4c17b-e2fe-be78-98ef-117d74804167",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693987943126,
    },
    "e-142": {
      id: "e-142",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-141",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64e9d3c98f3236f85be58cf3|9ec4c17b-e2fe-be78-98ef-117d74804167",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64e9d3c98f3236f85be58cf3|9ec4c17b-e2fe-be78-98ef-117d74804167",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693987943126,
    },
    "e-143": {
      id: "e-143",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-144",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64da0a444323314c87820823|17b30cd0-be11-a63a-0fc7-eb80f3856f5f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64da0a444323314c87820823|17b30cd0-be11-a63a-0fc7-eb80f3856f5f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693987957145,
    },
    "e-144": {
      id: "e-144",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-143",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64da0a444323314c87820823|17b30cd0-be11-a63a-0fc7-eb80f3856f5f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64da0a444323314c87820823|17b30cd0-be11-a63a-0fc7-eb80f3856f5f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693987957145,
    },
    "e-145": {
      id: "e-145",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-146",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64d0d3cb5f4d0385b71fd0f1|c6dc41a2-470c-aaed-ff4d-a5ef2a93e9a3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64d0d3cb5f4d0385b71fd0f1|c6dc41a2-470c-aaed-ff4d-a5ef2a93e9a3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693987970059,
    },
    "e-146": {
      id: "e-146",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-145",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64d0d3cb5f4d0385b71fd0f1|c6dc41a2-470c-aaed-ff4d-a5ef2a93e9a3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64d0d3cb5f4d0385b71fd0f1|c6dc41a2-470c-aaed-ff4d-a5ef2a93e9a3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1693987970059,
    },
  },
  actionLists: {
    a: {
      id: "a",
      title: "Hero Animation",
      continuousParameterGroups: [
        {
          id: "a-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 34,
              actionItems: [
                {
                  id: "a-n",
                  actionTypeId: "STYLE_SIZE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".hero-bg-black",
                      selectorGuids: ["b0904fbc-5948-0183-4bea-76c770a48d75"],
                    },
                    heightValue: 0,
                    widthUnit: "PX",
                    heightUnit: "vh",
                    locked: false,
                  },
                },
                {
                  id: "a-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".hero-heading-absolute",
                      selectorGuids: ["10c9d8cb-9439-979a-b04c-f116e68ae82a"],
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-n-5",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "64c7878ea5e3e133429ab75b|ba6287f1-81e4-8b6e-c34d-58492684ca0a",
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 56,
              actionItems: [
                {
                  id: "a-n-2",
                  actionTypeId: "STYLE_SIZE",
                  config: {
                    delay: 0,
                    easing: "outQuart",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".hero-bg-black",
                      selectorGuids: ["b0904fbc-5948-0183-4bea-76c770a48d75"],
                    },
                    heightValue: 100,
                    widthUnit: "PX",
                    heightUnit: "vh",
                    locked: false,
                  },
                },
              ],
            },
            {
              keyframe: 65,
              actionItems: [
                {
                  id: "a-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".hero-heading-absolute",
                      selectorGuids: ["10c9d8cb-9439-979a-b04c-f116e68ae82a"],
                    },
                    yValue: 100,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-n-6",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "64c7878ea5e3e133429ab75b|ba6287f1-81e4-8b6e-c34d-58492684ca0a",
                    },
                    yValue: -100,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1690804709094,
    },
    "a-2": {
      id: "a-2",
      title: "Projects Slide In On Scroll",
      continuousParameterGroups: [
        {
          id: "a-2-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-2-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-inner._1",
                      selectorGuids: [
                        "f28b8f9a-e382-8b52-33d5-27792dacaf47",
                        "ebb1a0e6-a2f8-9d63-2ae4-4a4a956ba3e0",
                      ],
                    },
                    xValue: null,
                    yValue: 450,
                    zValue: null,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "px",
                  },
                },
                {
                  id: "a-2-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-inner._2",
                      selectorGuids: [
                        "f28b8f9a-e382-8b52-33d5-27792dacaf47",
                        "796dcaf3-a6a9-900c-720d-e2c734c37178",
                      ],
                    },
                    yValue: 660,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-2-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-inner._1",
                      selectorGuids: [
                        "f28b8f9a-e382-8b52-33d5-27792dacaf47",
                        "ebb1a0e6-a2f8-9d63-2ae4-4a4a956ba3e0",
                      ],
                    },
                    yValue: -390,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-2-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".project-inner._2",
                      selectorGuids: [
                        "f28b8f9a-e382-8b52-33d5-27792dacaf47",
                        "796dcaf3-a6a9-900c-720d-e2c734c37178",
                      ],
                    },
                    yValue: -730,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1691408590454,
    },
    "a-3": {
      id: "a-3",
      title: "Cursor Project",
      continuousParameterGroups: [
        {
          id: "a-3-p",
          type: "MOUSE_X",
          parameterLabel: "Mouse X",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-3-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "64c7878ea5e3e133429ab75b|11661dc6-9e26-541f-76be-7bd103aa3e94",
                    },
                    xValue: -50,
                    xUnit: "vw",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-3-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "64c7878ea5e3e133429ab75b|11661dc6-9e26-541f-76be-7bd103aa3e94",
                    },
                    xValue: 50,
                    xUnit: "vw",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "a-3-p-2",
          type: "MOUSE_Y",
          parameterLabel: "Mouse Y",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-3-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "64c7878ea5e3e133429ab75b|11661dc6-9e26-541f-76be-7bd103aa3e94",
                    },
                    yValue: -50,
                    xUnit: "PX",
                    yUnit: "vh",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-3-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      id: "64c7878ea5e3e133429ab75b|11661dc6-9e26-541f-76be-7bd103aa3e94",
                    },
                    yValue: 50,
                    xUnit: "PX",
                    yUnit: "vh",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1691756442900,
    },
    "a-4": {
      id: "a-4",
      title: "Project Button",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-4-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".project-button",
                  selectorGuids: ["276b7e95-3fbb-7aa0-ec47-7e651174d281"],
                },
                xValue: 0,
                yValue: 0,
                locked: true,
              },
            },
            {
              id: "a-4-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".project-button",
                  selectorGuids: ["276b7e95-3fbb-7aa0-ec47-7e651174d281"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-4-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 700,
                target: {
                  selector: ".project-button",
                  selectorGuids: ["276b7e95-3fbb-7aa0-ec47-7e651174d281"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
            {
              id: "a-4-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".project-button",
                  selectorGuids: ["276b7e95-3fbb-7aa0-ec47-7e651174d281"],
                },
                value: "flex",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1691757698390,
    },
    "a-5": {
      id: "a-5",
      title: "Project Button Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-5-n-3",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 0,
                target: {
                  selector: ".project-button",
                  selectorGuids: ["276b7e95-3fbb-7aa0-ec47-7e651174d281"],
                },
                xValue: 0,
                yValue: 0,
                locked: true,
              },
            },
            {
              id: "a-5-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".project-button",
                  selectorGuids: ["276b7e95-3fbb-7aa0-ec47-7e651174d281"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1691757698390,
    },
    "a-38": {
      id: "a-38",
      title: "About Hero Animation Mobile",
      continuousParameterGroups: [
        {
          id: "a-38-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 34,
              actionItems: [
                {
                  id: "a-38-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".ah-mask",
                      selectorGuids: ["300849a2-ec43-ec70-5fb4-0f48ec4a526f"],
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-38-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".text-shape-wrapper._1",
                      selectorGuids: [
                        "9ed14ac7-57d3-357e-fb94-29d9fd927373",
                        "8e7e58b2-afff-8fe3-1c4b-4f4a2f8d6238",
                      ],
                    },
                    xValue: null,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-38-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".text-shape-wrapper._2",
                      selectorGuids: [
                        "9ed14ac7-57d3-357e-fb94-29d9fd927373",
                        "d65e1799-5af8-d794-7865-40e81e6553fc",
                      ],
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-38-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".text-shape-wrapper._3",
                      selectorGuids: [
                        "9ed14ac7-57d3-357e-fb94-29d9fd927373",
                        "3b342249-9c80-f8fa-f8fc-249513224b95",
                      ],
                    },
                    xValue: null,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 60,
              actionItems: [
                {
                  id: "a-38-n-5",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".ah-mask",
                      selectorGuids: ["300849a2-ec43-ec70-5fb4-0f48ec4a526f"],
                    },
                    yValue: 100,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 70,
              actionItems: [
                {
                  id: "a-38-n-6",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".text-shape-wrapper._3",
                      selectorGuids: [
                        "9ed14ac7-57d3-357e-fb94-29d9fd927373",
                        "3b342249-9c80-f8fa-f8fc-249513224b95",
                      ],
                    },
                    xValue: null,
                    yValue: -270,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-38-n-7",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".text-shape-wrapper._2",
                      selectorGuids: [
                        "9ed14ac7-57d3-357e-fb94-29d9fd927373",
                        "d65e1799-5af8-d794-7865-40e81e6553fc",
                      ],
                    },
                    yValue: -160,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-38-n-8",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".text-shape-wrapper._1",
                      selectorGuids: [
                        "9ed14ac7-57d3-357e-fb94-29d9fd927373",
                        "8e7e58b2-afff-8fe3-1c4b-4f4a2f8d6238",
                      ],
                    },
                    xValue: null,
                    yValue: -240,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1692353468101,
    },
    "a-8": {
      id: "a-8",
      title: "[About] Text Shapes Move On Scroll",
      continuousParameterGroups: [
        {
          id: "a-8-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 15,
              actionItems: [
                {
                  id: "a-8-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".ac-text-shape-wrapper._1",
                      selectorGuids: [
                        "852fa3aa-8c94-ce3f-efde-e27a183692f7",
                        "2fda7a12-b856-4e52-0c60-dd14a66a5303",
                      ],
                    },
                    xValue: 0,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-8-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".ac-text-shape-wrapper._2",
                      selectorGuids: [
                        "852fa3aa-8c94-ce3f-efde-e27a183692f7",
                        "602bc4d0-a6f0-2dee-79d8-a5959c05f712",
                      ],
                    },
                    xValue: 0,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-8-n-5",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".ac-text-shape-wrapper._3",
                      selectorGuids: [
                        "852fa3aa-8c94-ce3f-efde-e27a183692f7",
                        "af7f8532-f6e5-1c36-0adc-8809b92ae1ec",
                      ],
                    },
                    xValue: 0,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-8-n-7",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".ac-avatar-wrapper",
                      selectorGuids: ["2d2701f2-1a1a-59ef-75c2-0bb79429afe1"],
                    },
                    zValue: 0,
                    xUnit: "DEG",
                    yUnit: "DEG",
                    zUnit: "deg",
                  },
                },
                {
                  id: "a-8-n-9",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".ac-text-shape-wrapper._4",
                      selectorGuids: [
                        "852fa3aa-8c94-ce3f-efde-e27a183692f7",
                        "0ccae44c-c44b-2950-917d-28e9702ea0f9",
                      ],
                    },
                    xValue: 0,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-8-n-11",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".ac-text-shape-wrapper._5",
                      selectorGuids: [
                        "852fa3aa-8c94-ce3f-efde-e27a183692f7",
                        "25f3c7fe-8095-3bfc-0571-ed14b1fea8a1",
                      ],
                    },
                    xValue: 0,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-8-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".ac-text-shape-wrapper._1",
                      selectorGuids: [
                        "852fa3aa-8c94-ce3f-efde-e27a183692f7",
                        "2fda7a12-b856-4e52-0c60-dd14a66a5303",
                      ],
                    },
                    xValue: -40,
                    yValue: -60,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-8-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".ac-text-shape-wrapper._2",
                      selectorGuids: [
                        "852fa3aa-8c94-ce3f-efde-e27a183692f7",
                        "602bc4d0-a6f0-2dee-79d8-a5959c05f712",
                      ],
                    },
                    xValue: 60,
                    yValue: -70,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-8-n-6",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".ac-text-shape-wrapper._3",
                      selectorGuids: [
                        "852fa3aa-8c94-ce3f-efde-e27a183692f7",
                        "af7f8532-f6e5-1c36-0adc-8809b92ae1ec",
                      ],
                    },
                    xValue: -90,
                    yValue: 100,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-8-n-8",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".ac-avatar-wrapper",
                      selectorGuids: ["2d2701f2-1a1a-59ef-75c2-0bb79429afe1"],
                    },
                    zValue: 180,
                    xUnit: "DEG",
                    yUnit: "DEG",
                    zUnit: "deg",
                  },
                },
                {
                  id: "a-8-n-10",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".ac-text-shape-wrapper._4",
                      selectorGuids: [
                        "852fa3aa-8c94-ce3f-efde-e27a183692f7",
                        "0ccae44c-c44b-2950-917d-28e9702ea0f9",
                      ],
                    },
                    xValue: 150,
                    yValue: 80,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-8-n-12",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".ac-text-shape-wrapper._5",
                      selectorGuids: [
                        "852fa3aa-8c94-ce3f-efde-e27a183692f7",
                        "25f3c7fe-8095-3bfc-0571-ed14b1fea8a1",
                      ],
                    },
                    xValue: 40,
                    yValue: -80,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1692703546758,
    },
    "a-9": {
      id: "a-9",
      title: "[About] Image Move On Sroll",
      continuousParameterGroups: [
        {
          id: "a-9-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-9-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".ap-image-1",
                      selectorGuids: ["c2068704-e895-ebea-1a1d-b211d2f480f7"],
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-9-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".ap-image-2",
                      selectorGuids: ["f96559cb-1b1d-79c2-6a01-f17b2aefaf31"],
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-9-n-5",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".ap-image-3",
                      selectorGuids: ["e44dccff-5186-da84-3970-eb203940037f"],
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 75,
              actionItems: [
                {
                  id: "a-9-n-6",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".ap-image-3",
                      selectorGuids: ["e44dccff-5186-da84-3970-eb203940037f"],
                    },
                    yValue: -90,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 80,
              actionItems: [
                {
                  id: "a-9-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".ap-image-1",
                      selectorGuids: ["c2068704-e895-ebea-1a1d-b211d2f480f7"],
                    },
                    yValue: 50,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-9-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".ap-image-2",
                      selectorGuids: ["f96559cb-1b1d-79c2-6a01-f17b2aefaf31"],
                    },
                    yValue: -50,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1692710570573,
    },
    "a-10": {
      id: "a-10",
      title: "[About] Testimonials Cards",
      continuousParameterGroups: [
        {
          id: "a-10-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-10-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".testimonials-card-wrapper._1",
                      selectorGuids: [
                        "c06fa4cb-fd3f-470f-b7e6-21c14d8ec706",
                        "16d91a86-84b7-dcdd-3682-2be106fb8e0d",
                      ],
                    },
                    xValue: 0,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-10-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".testimonials-card-wrapper._2",
                      selectorGuids: [
                        "c06fa4cb-fd3f-470f-b7e6-21c14d8ec706",
                        "31215281-9cd5-58a1-3ca0-fc00e4e85204",
                      ],
                    },
                    xValue: 0,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-10-n-5",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".testimonials-card-wrapper._3",
                      selectorGuids: [
                        "c06fa4cb-fd3f-470f-b7e6-21c14d8ec706",
                        "a9084d07-d1a6-57d4-bc67-f2c2c44b5004",
                      ],
                    },
                    xValue: 0,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-10-n-7",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".testimonials-card-wrapper._4",
                      selectorGuids: [
                        "c06fa4cb-fd3f-470f-b7e6-21c14d8ec706",
                        "aa19d272-c94d-d123-8a58-85d49a9b46cc",
                      ],
                    },
                    xValue: 0,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-10-n-9",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".testimonials-card-wrapper._5",
                      selectorGuids: [
                        "c06fa4cb-fd3f-470f-b7e6-21c14d8ec706",
                        "db82ebca-fde2-a843-5327-6f7bc7de2b2c",
                      ],
                    },
                    xValue: 0,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-10-n-11",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".testimonials-card-wrapper._6",
                      selectorGuids: [
                        "c06fa4cb-fd3f-470f-b7e6-21c14d8ec706",
                        "2d4bef57-4412-8b25-e26a-d0eca5b260d0",
                      ],
                    },
                    xValue: 0,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-10-n-13",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".testimonials-card-wrapper._7",
                      selectorGuids: [
                        "c06fa4cb-fd3f-470f-b7e6-21c14d8ec706",
                        "bf289268-b577-5856-dd64-c2165c9aa7f0",
                      ],
                    },
                    xValue: 0,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-10-n-15",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".testimonials-card-wrapper._8",
                      selectorGuids: [
                        "c06fa4cb-fd3f-470f-b7e6-21c14d8ec706",
                        "27298c17-2b63-d4f5-54a9-05dfc6599d36",
                      ],
                    },
                    xValue: 0,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-10-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".testimonials-card-wrapper._1",
                      selectorGuids: [
                        "c06fa4cb-fd3f-470f-b7e6-21c14d8ec706",
                        "16d91a86-84b7-dcdd-3682-2be106fb8e0d",
                      ],
                    },
                    xValue: -290,
                    yValue: 120,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-10-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".testimonials-card-wrapper._2",
                      selectorGuids: [
                        "c06fa4cb-fd3f-470f-b7e6-21c14d8ec706",
                        "31215281-9cd5-58a1-3ca0-fc00e4e85204",
                      ],
                    },
                    xValue: -60,
                    yValue: -150,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-10-n-6",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".testimonials-card-wrapper._3",
                      selectorGuids: [
                        "c06fa4cb-fd3f-470f-b7e6-21c14d8ec706",
                        "a9084d07-d1a6-57d4-bc67-f2c2c44b5004",
                      ],
                    },
                    xValue: 80,
                    yValue: -160,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-10-n-8",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".testimonials-card-wrapper._4",
                      selectorGuids: [
                        "c06fa4cb-fd3f-470f-b7e6-21c14d8ec706",
                        "aa19d272-c94d-d123-8a58-85d49a9b46cc",
                      ],
                    },
                    xValue: 30,
                    yValue: 90,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-10-n-10",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".testimonials-card-wrapper._5",
                      selectorGuids: [
                        "c06fa4cb-fd3f-470f-b7e6-21c14d8ec706",
                        "db82ebca-fde2-a843-5327-6f7bc7de2b2c",
                      ],
                    },
                    xValue: -120,
                    yValue: 100,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-10-n-12",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".testimonials-card-wrapper._6",
                      selectorGuids: [
                        "c06fa4cb-fd3f-470f-b7e6-21c14d8ec706",
                        "2d4bef57-4412-8b25-e26a-d0eca5b260d0",
                      ],
                    },
                    xValue: 70,
                    yValue: -100,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-10-n-14",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".testimonials-card-wrapper._7",
                      selectorGuids: [
                        "c06fa4cb-fd3f-470f-b7e6-21c14d8ec706",
                        "bf289268-b577-5856-dd64-c2165c9aa7f0",
                      ],
                    },
                    xValue: 160,
                    yValue: 60,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-10-n-16",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".testimonials-card-wrapper._8",
                      selectorGuids: [
                        "c06fa4cb-fd3f-470f-b7e6-21c14d8ec706",
                        "27298c17-2b63-d4f5-54a9-05dfc6599d36",
                      ],
                    },
                    xValue: -80,
                    yValue: 90,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1692715209173,
    },
    "a-11": {
      id: "a-11",
      title: "[Portfolio] Hero Animation",
      continuousParameterGroups: [
        {
          id: "a-11-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 32,
              actionItems: [
                {
                  id: "a-11-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: [0.25, 0.25, 0.75, 0.75],
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".ph-card",
                      selectorGuids: ["f601eba6-5579-3cb4-828e-6502ff6a4f8c"],
                    },
                    xValue: 140,
                    yValue: -240,
                    xUnit: "%",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-11-n-3",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: [0.25, 0.25, 0.75, 0.75],
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".ph-card",
                      selectorGuids: ["f601eba6-5579-3cb4-828e-6502ff6a4f8c"],
                    },
                    zValue: 20,
                    xUnit: "DEG",
                    yUnit: "DEG",
                    zUnit: "deg",
                  },
                },
                {
                  id: "a-11-n-5",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: [0.25, 0.25, 0.75, 0.75],
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".ph-card",
                      selectorGuids: ["f601eba6-5579-3cb4-828e-6502ff6a4f8c"],
                    },
                    xValue: 0.5,
                    yValue: 0.5,
                    locked: true,
                  },
                },
              ],
            },
            {
              keyframe: 70,
              actionItems: [
                {
                  id: "a-11-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".ph-card",
                      selectorGuids: ["f601eba6-5579-3cb4-828e-6502ff6a4f8c"],
                    },
                    xValue: 0,
                    yValue: 0,
                    xUnit: "%",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-11-n-4",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".ph-card",
                      selectorGuids: ["f601eba6-5579-3cb4-828e-6502ff6a4f8c"],
                    },
                    zValue: 0,
                    xUnit: "DEG",
                    yUnit: "DEG",
                    zUnit: "deg",
                  },
                },
                {
                  id: "a-11-n-6",
                  actionTypeId: "TRANSFORM_SCALE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".ph-card",
                      selectorGuids: ["f601eba6-5579-3cb4-828e-6502ff6a4f8c"],
                    },
                    xValue: 1,
                    yValue: 1,
                    locked: true,
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1692784117328,
    },
    "a-12": {
      id: "a-12",
      title: "[Portfolio] Project Hover Animation",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-12-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pp-background",
                  selectorGuids: ["2824f878-86c4-9aed-095e-35f8932d3588"],
                },
                value: "none",
              },
            },
            {
              id: "a-12-n-9",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pp-text-wrapper",
                  selectorGuids: ["cd8bdd33-53fa-bf40-1a18-6a56cec37855"],
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-12-n-7",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pp-background",
                  selectorGuids: ["2824f878-86c4-9aed-095e-35f8932d3588"],
                },
                yValue: 110,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-12-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pp-text-wrapper",
                  selectorGuids: ["cd8bdd33-53fa-bf40-1a18-6a56cec37855"],
                },
                xValue: null,
                yValue: 120,
                xUnit: "px",
                yUnit: "%",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-12-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pp-background",
                  selectorGuids: ["2824f878-86c4-9aed-095e-35f8932d3588"],
                },
                value: "flex",
              },
            },
            {
              id: "a-12-n-8",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pp-background",
                  selectorGuids: ["2824f878-86c4-9aed-095e-35f8932d3588"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-12-n-10",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "",
                duration: 25000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pp-text-wrapper",
                  selectorGuids: ["cd8bdd33-53fa-bf40-1a18-6a56cec37855"],
                },
                xValue: -67.3,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-12-n-6",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "outQuart",
                duration: 700,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pp-text-wrapper",
                  selectorGuids: ["cd8bdd33-53fa-bf40-1a18-6a56cec37855"],
                },
                xValue: null,
                yValue: 0,
                xUnit: "px",
                yUnit: "%",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-12-n-11",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pp-text-wrapper",
                  selectorGuids: ["cd8bdd33-53fa-bf40-1a18-6a56cec37855"],
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1692789734583,
    },
    "a-13": {
      id: "a-13",
      title: "[Portfolio] Project Hover Animation 2",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-13-n-6",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 400,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pp-background",
                  selectorGuids: ["2824f878-86c4-9aed-095e-35f8932d3588"],
                },
                yValue: 110,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-13-n-8",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pp-text-wrapper",
                  selectorGuids: ["cd8bdd33-53fa-bf40-1a18-6a56cec37855"],
                },
                xValue: null,
                yValue: 120,
                xUnit: "px",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-13-n-5",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 700,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pp-background",
                  selectorGuids: ["2824f878-86c4-9aed-095e-35f8932d3588"],
                },
                value: "none",
              },
            },
            {
              id: "a-13-n-7",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 700,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".pp-text-wrapper",
                  selectorGuids: ["cd8bdd33-53fa-bf40-1a18-6a56cec37855"],
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1692789734583,
    },
    "a-14": {
      id: "a-14",
      title: "[Project Single] Hero Animation",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-14-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".psh-image",
                  selectorGuids: ["720e4619-61f1-a9a0-cfc7-a35f980fed7b"],
                },
                xValue: 0.5,
                yValue: 0.5,
                locked: true,
              },
            },
            {
              id: "a-14-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".psh-text-wrapper",
                  selectorGuids: ["65579967-7db4-98d0-f420-617a84950bb9"],
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-14-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 1700,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".psh-image",
                  selectorGuids: ["720e4619-61f1-a9a0-cfc7-a35f980fed7b"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
            {
              id: "a-14-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 25000,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".psh-text-wrapper",
                  selectorGuids: ["65579967-7db4-98d0-f420-617a84950bb9"],
                },
                xValue: -90,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-14-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".psh-text-wrapper",
                  selectorGuids: ["65579967-7db4-98d0-f420-617a84950bb9"],
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1692864982605,
    },
    "a-15": {
      id: "a-15",
      title: "[Project Single] Images Move On Scroll",
      continuousParameterGroups: [
        {
          id: "a-15-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-15-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".psi-image-2",
                      selectorGuids: ["5143eae7-a52f-9636-d978-372aebf32e91"],
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-15-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".psi-image-3",
                      selectorGuids: ["e1bdda2b-c6cd-79d9-3c23-e31ddc222e0d"],
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-15-n-5",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".psi-image-4",
                      selectorGuids: ["33c254f6-4aec-ebd9-74fb-08c80a7299e9"],
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-15-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".psi-image-2",
                      selectorGuids: ["5143eae7-a52f-9636-d978-372aebf32e91"],
                    },
                    yValue: 66,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-15-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".psi-image-3",
                      selectorGuids: ["e1bdda2b-c6cd-79d9-3c23-e31ddc222e0d"],
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-15-n-6",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".psi-image-4",
                      selectorGuids: ["33c254f6-4aec-ebd9-74fb-08c80a7299e9"],
                    },
                    yValue: -100,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1692868871977,
    },
    "a-16": {
      id: "a-16",
      title: "[Project Single] Footer Infinite Loop",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-16-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".np-wrapper",
                  selectorGuids: ["3620d589-b0ff-a2e9-c1fb-7bf480c7274e"],
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-16-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 25000,
                target: {
                  selector: ".np-wrapper",
                  selectorGuids: ["3620d589-b0ff-a2e9-c1fb-7bf480c7274e"],
                },
                xValue: -25.3,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-16-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".np-wrapper",
                  selectorGuids: ["3620d589-b0ff-a2e9-c1fb-7bf480c7274e"],
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1692874626743,
    },
    "a-6": {
      id: "a-6",
      title: "Cards Move On Scroll",
      continuousParameterGroups: [
        {
          id: "a-6-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-6-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".blog-wrapper._1",
                      selectorGuids: [
                        "39dd6ed3-49cf-6bdc-015e-1bb01007ac8e",
                        "56ed9a12-3337-e381-f078-59d554ee7467",
                      ],
                    },
                    xValue: 0,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-6-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".blog-wrapper._2",
                      selectorGuids: [
                        "39dd6ed3-49cf-6bdc-015e-1bb01007ac8e",
                        "b8b7bc43-8f9c-93ee-bfb9-67b9c764cdb2",
                      ],
                    },
                    xValue: 0,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-6-n-5",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".blog-wrapper._3",
                      selectorGuids: [
                        "39dd6ed3-49cf-6bdc-015e-1bb01007ac8e",
                        "1c2b79f1-559d-b4d4-bbe2-b180c623da6e",
                      ],
                    },
                    xValue: 0,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-6-n-7",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".blog-wrapper._4",
                      selectorGuids: [
                        "39dd6ed3-49cf-6bdc-015e-1bb01007ac8e",
                        "bce42c1f-334c-9a84-fc3a-c71260c8a0ff",
                      ],
                    },
                    xValue: 0,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-6-n-9",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".blog-wrapper._5",
                      selectorGuids: [
                        "39dd6ed3-49cf-6bdc-015e-1bb01007ac8e",
                        "794fc3dd-0cd4-642d-59e0-7a3b3594acb1",
                      ],
                    },
                    xValue: 0,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-6-n-11",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".blog-wrapper._6",
                      selectorGuids: [
                        "39dd6ed3-49cf-6bdc-015e-1bb01007ac8e",
                        "cc2d7f89-d4fe-0af9-59f8-c1784a56108d",
                      ],
                    },
                    xValue: 0,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-6-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".blog-wrapper._1",
                      selectorGuids: [
                        "39dd6ed3-49cf-6bdc-015e-1bb01007ac8e",
                        "56ed9a12-3337-e381-f078-59d554ee7467",
                      ],
                    },
                    xValue: -140,
                    yValue: 180,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-6-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".blog-wrapper._2",
                      selectorGuids: [
                        "39dd6ed3-49cf-6bdc-015e-1bb01007ac8e",
                        "b8b7bc43-8f9c-93ee-bfb9-67b9c764cdb2",
                      ],
                    },
                    xValue: -150,
                    yValue: -250,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-6-n-6",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".blog-wrapper._3",
                      selectorGuids: [
                        "39dd6ed3-49cf-6bdc-015e-1bb01007ac8e",
                        "1c2b79f1-559d-b4d4-bbe2-b180c623da6e",
                      ],
                    },
                    xValue: 90,
                    yValue: -150,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-6-n-8",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".blog-wrapper._4",
                      selectorGuids: [
                        "39dd6ed3-49cf-6bdc-015e-1bb01007ac8e",
                        "bce42c1f-334c-9a84-fc3a-c71260c8a0ff",
                      ],
                    },
                    xValue: 20,
                    yValue: 130,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-6-n-10",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".blog-wrapper._5",
                      selectorGuids: [
                        "39dd6ed3-49cf-6bdc-015e-1bb01007ac8e",
                        "794fc3dd-0cd4-642d-59e0-7a3b3594acb1",
                      ],
                    },
                    xValue: 40,
                    yValue: -60,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-6-n-12",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".blog-wrapper._6",
                      selectorGuids: [
                        "39dd6ed3-49cf-6bdc-015e-1bb01007ac8e",
                        "cc2d7f89-d4fe-0af9-59f8-c1784a56108d",
                      ],
                    },
                    xValue: 230,
                    yValue: -70,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1692096688473,
    },
    "a-17": {
      id: "a-17",
      title: "Menu Open",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-17-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".menu",
                  selectorGuids: ["ade41936-4df1-c1d7-3d2d-a807cbb1da87"],
                },
                yValue: -101,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-17-n-18",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".menu",
                  selectorGuids: ["ade41936-4df1-c1d7-3d2d-a807cbb1da87"],
                },
                value: "none",
              },
            },
            {
              id: "a-17-n-16",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".menu-button-text",
                  selectorGuids: ["2e8a890d-40a4-17be-d2d6-c94f1d215614"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-17-n-14",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".p-14px.white",
                  selectorGuids: [
                    "f6246bf8-fcfa-9b8f-8620-aa57a58dd575",
                    "5b6f9b75-b5b4-2347-624c-ba911e0425d9",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-17-n-13",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".menu-circle",
                  selectorGuids: ["eb5e3661-568c-4ecb-7dd8-9cc3d6a393ac"],
                },
                yValue: 100,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-17-n-11",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".menu-heading._2",
                  selectorGuids: [
                    "e31e5cde-2a5d-4c4e-5382-7c568030a666",
                    "b2a23419-ab35-4dc6-c6d8-25a9592300e5",
                  ],
                },
                yValue: 110,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-17-n-9",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".menu-heading._1",
                  selectorGuids: [
                    "e31e5cde-2a5d-4c4e-5382-7c568030a666",
                    "a6b2e258-ce01-4924-1786-31a797635e76",
                  ],
                },
                yValue: 110,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-17-n-7",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".menu-card",
                  selectorGuids: ["dcae14f2-7233-a7c8-b6bd-f4e46aeca618"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-17-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".menu-grid",
                  selectorGuids: ["1867eb56-cd38-465d-e9c4-4b50a3ff8334"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-17-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".menu-grid",
                  selectorGuids: ["1867eb56-cd38-465d-e9c4-4b50a3ff8334"],
                },
                yValue: 30,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-17-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 600,
                target: {
                  selector: ".menu",
                  selectorGuids: ["ade41936-4df1-c1d7-3d2d-a807cbb1da87"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-17-n-19",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".menu",
                  selectorGuids: ["ade41936-4df1-c1d7-3d2d-a807cbb1da87"],
                },
                value: "flex",
              },
            },
            {
              id: "a-17-n-15",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 700,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".p-14px.white",
                  selectorGuids: [
                    "f6246bf8-fcfa-9b8f-8620-aa57a58dd575",
                    "5b6f9b75-b5b4-2347-624c-ba911e0425d9",
                  ],
                },
                yValue: -101,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-17-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 100,
                easing: "inOutQuart",
                duration: 800,
                target: {
                  selector: ".menu-circle",
                  selectorGuids: ["eb5e3661-568c-4ecb-7dd8-9cc3d6a393ac"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-17-n-17",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 100,
                easing: "outQuart",
                duration: 700,
                target: {
                  selector: ".menu-button-text",
                  selectorGuids: ["2e8a890d-40a4-17be-d2d6-c94f1d215614"],
                },
                yValue: -18,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-17-n-10",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 400,
                easing: "outQuart",
                duration: 500,
                target: {
                  selector: ".menu-heading._1",
                  selectorGuids: [
                    "e31e5cde-2a5d-4c4e-5382-7c568030a666",
                    "a6b2e258-ce01-4924-1786-31a797635e76",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-17-n-8",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 400,
                easing: "inOutQuart",
                duration: 800,
                target: {
                  selector: ".menu-card",
                  selectorGuids: ["dcae14f2-7233-a7c8-b6bd-f4e46aeca618"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-17-n-6",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 400,
                easing: "inOutQuart",
                duration: 800,
                target: {
                  selector: ".menu-grid",
                  selectorGuids: ["1867eb56-cd38-465d-e9c4-4b50a3ff8334"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-17-n-12",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 600,
                easing: "outQuart",
                duration: 500,
                target: {
                  selector: ".menu-heading._2",
                  selectorGuids: [
                    "e31e5cde-2a5d-4c4e-5382-7c568030a666",
                    "b2a23419-ab35-4dc6-c6d8-25a9592300e5",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1692971653043,
    },
    "a-18": {
      id: "a-18",
      title: "Menu Close",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-18-n-9",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 800,
                target: {
                  selector: ".menu-circle",
                  selectorGuids: ["eb5e3661-568c-4ecb-7dd8-9cc3d6a393ac"],
                },
                yValue: 100,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-18-n-15",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 700,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".menu-button-text",
                  selectorGuids: ["2e8a890d-40a4-17be-d2d6-c94f1d215614"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-18-n-11",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 800,
                target: {
                  selector: ".menu-card",
                  selectorGuids: ["dcae14f2-7233-a7c8-b6bd-f4e46aeca618"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-18-n-12",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 800,
                target: {
                  selector: ".menu-grid",
                  selectorGuids: ["1867eb56-cd38-465d-e9c4-4b50a3ff8334"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-18-n-13",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 500,
                target: {
                  selector: ".menu-heading._2",
                  selectorGuids: [
                    "e31e5cde-2a5d-4c4e-5382-7c568030a666",
                    "b2a23419-ab35-4dc6-c6d8-25a9592300e5",
                  ],
                },
                yValue: 110,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-18-n-14",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 100,
                easing: "outQuart",
                duration: 700,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".p-14px.white",
                  selectorGuids: [
                    "f6246bf8-fcfa-9b8f-8620-aa57a58dd575",
                    "5b6f9b75-b5b4-2347-624c-ba911e0425d9",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-18-n-10",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "outQuart",
                duration: 500,
                target: {
                  selector: ".menu-heading._1",
                  selectorGuids: [
                    "e31e5cde-2a5d-4c4e-5382-7c568030a666",
                    "a6b2e258-ce01-4924-1786-31a797635e76",
                  ],
                },
                yValue: 110,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-18-n-8",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 400,
                easing: "inOutQuart",
                duration: 600,
                target: {
                  selector: ".menu",
                  selectorGuids: ["ade41936-4df1-c1d7-3d2d-a807cbb1da87"],
                },
                yValue: -101,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-18-n-16",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 1000,
                easing: "",
                duration: 0,
                target: {
                  selector: ".menu",
                  selectorGuids: ["ade41936-4df1-c1d7-3d2d-a807cbb1da87"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1692971653043,
    },
    "a-19": {
      id: "a-19",
      title: "Footer Cards",
      continuousParameterGroups: [
        {
          id: "a-19-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-19-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".footer-card-wrapper._1",
                      selectorGuids: [
                        "744efe8a-720a-7c0d-c613-7aac89e6f0b2",
                        "fe27a700-db38-22e4-c742-cb62b262a5fc",
                      ],
                    },
                    xValue: 0,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-19-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".footer-card-wrapper._2",
                      selectorGuids: [
                        "744efe8a-720a-7c0d-c613-7aac89e6f0b2",
                        "b8e93295-d13d-671f-ef30-a294c7ae2bfa",
                      ],
                    },
                    xValue: 0,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-19-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".footer-card-wrapper._1",
                      selectorGuids: [
                        "744efe8a-720a-7c0d-c613-7aac89e6f0b2",
                        "fe27a700-db38-22e4-c742-cb62b262a5fc",
                      ],
                    },
                    xValue: -120,
                    yValue: 60,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-19-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".footer-card-wrapper._2",
                      selectorGuids: [
                        "744efe8a-720a-7c0d-c613-7aac89e6f0b2",
                        "b8e93295-d13d-671f-ef30-a294c7ae2bfa",
                      ],
                    },
                    xValue: 100,
                    yValue: -70,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1692974396734,
    },
    "a-20": {
      id: "a-20",
      title: "[Contact] Card Animation",
      continuousParameterGroups: [
        {
          id: "a-20-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 46,
              actionItems: [
                {
                  id: "a-20-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".contact-card-wrapper",
                      selectorGuids: ["9549cddd-b8cc-06b1-ebf3-191e5710b5f4"],
                    },
                    xValue: null,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-20-n-3",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".contact-card-wrapper",
                      selectorGuids: ["9549cddd-b8cc-06b1-ebf3-191e5710b5f4"],
                    },
                    zValue: 0,
                    xUnit: "DEG",
                    yUnit: "DEG",
                    zUnit: "deg",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-20-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".contact-card-wrapper",
                      selectorGuids: ["9549cddd-b8cc-06b1-ebf3-191e5710b5f4"],
                    },
                    xValue: null,
                    yValue: 380,
                    xUnit: "px",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-20-n-4",
                  actionTypeId: "TRANSFORM_ROTATE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".contact-card-wrapper",
                      selectorGuids: ["9549cddd-b8cc-06b1-ebf3-191e5710b5f4"],
                    },
                    zValue: -13,
                    xUnit: "DEG",
                    yUnit: "DEG",
                    zUnit: "deg",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1692977542343,
    },
    "a-21": {
      id: "a-21",
      title: "[404] Text Animation",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-21-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: "._404-heading._1",
                  selectorGuids: [
                    "e4cf9198-dc65-05be-f8da-0803f2183c81",
                    "6fd01b60-ea18-290a-62a9-c212a836fec3",
                  ],
                },
                yValue: -140,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-21-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "inOutQuart",
                duration: 800,
                target: {
                  selector: "._404-heading._1",
                  selectorGuids: [
                    "e4cf9198-dc65-05be-f8da-0803f2183c81",
                    "6fd01b60-ea18-290a-62a9-c212a836fec3",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1693045590170,
    },
    "a-22": {
      id: "a-22",
      title: "Line Slide Out Hover",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-22-n",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".line",
                  selectorGuids: ["90aae011-4c72-8ea1-4112-37ab44b4b156"],
                },
                widthValue: 100,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-22-n-2",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".line",
                  selectorGuids: ["90aae011-4c72-8ea1-4112-37ab44b4b156"],
                },
                widthValue: 0,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1693386868006,
    },
    "a-23": {
      id: "a-23",
      title: "Line Slide In Hover",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-23-n-2",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".line",
                  selectorGuids: ["90aae011-4c72-8ea1-4112-37ab44b4b156"],
                },
                widthValue: 100,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1693386868006,
    },
    "a-24": {
      id: "a-24",
      title: "Button Hover",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-24-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button-text",
                  selectorGuids: ["9064ca49-a01e-c447-ba0e-248ff3f2d829"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-24-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".p-14px",
                  selectorGuids: ["f6246bf8-fcfa-9b8f-8620-aa57a58dd575"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-24-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 700,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".p-14px",
                  selectorGuids: ["f6246bf8-fcfa-9b8f-8620-aa57a58dd575"],
                },
                yValue: -101,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
            {
              id: "a-24-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 100,
                easing: "outQuart",
                duration: 700,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button-text",
                  selectorGuids: ["9064ca49-a01e-c447-ba0e-248ff3f2d829"],
                },
                yValue: -18,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1693387294909,
    },
    "a-25": {
      id: "a-25",
      title: "Button Hover Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-25-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 700,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".button-text",
                  selectorGuids: ["9064ca49-a01e-c447-ba0e-248ff3f2d829"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-25-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 100,
                easing: "outQuart",
                duration: 700,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".p-14px",
                  selectorGuids: ["f6246bf8-fcfa-9b8f-8620-aa57a58dd575"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1693387294909,
    },
    "a-26": {
      id: "a-26",
      title: "Button Background Move On Hover",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-26-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".cta-background",
                  selectorGuids: ["dae0b40c-c14c-427f-c9a2-11320ad9de74"],
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-7",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".cta-button-text",
                  selectorGuids: ["966085c0-674b-0350-8c4c-8e3ee9c66893"],
                },
                globalSwatchId: "",
                rValue: 198,
                bValue: 1,
                gValue: 177,
                aValue: 1,
              },
            },
            {
              id: "a-26-n-5",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".cta-button-text._2",
                  selectorGuids: [
                    "966085c0-674b-0350-8c4c-8e3ee9c66893",
                    "e8280eee-b3bf-2f71-e3e6-b823182440e3",
                  ],
                },
                globalSwatchId: "",
                rValue: 0,
                bValue: 0,
                gValue: 0,
                aValue: 1,
              },
            },
            {
              id: "a-26-n-3",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".cta-background",
                  selectorGuids: ["dae0b40c-c14c-427f-c9a2-11320ad9de74"],
                },
                widthValue: 131,
                widthUnit: "px",
                heightUnit: "PX",
                locked: false,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-26-n-4",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 700,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".cta-background",
                  selectorGuids: ["dae0b40c-c14c-427f-c9a2-11320ad9de74"],
                },
                widthValue: 138,
                widthUnit: "px",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-26-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 700,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".cta-background",
                  selectorGuids: ["dae0b40c-c14c-427f-c9a2-11320ad9de74"],
                },
                xValue: -128,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-6",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 100,
                easing: "outQuart",
                duration: 700,
                target: {
                  selector: ".cta-button-text._2",
                  selectorGuids: [
                    "966085c0-674b-0350-8c4c-8e3ee9c66893",
                    "e8280eee-b3bf-2f71-e3e6-b823182440e3",
                  ],
                },
                globalSwatchId: "",
                rValue: 255,
                bValue: 255,
                gValue: 255,
                aValue: 1,
              },
            },
            {
              id: "a-26-n-8",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 100,
                easing: "outQuart",
                duration: 700,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".cta-button-text",
                  selectorGuids: ["966085c0-674b-0350-8c4c-8e3ee9c66893"],
                },
                globalSwatchId: "",
                rValue: 0,
                bValue: 0,
                gValue: 0,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1693387805667,
    },
    "a-27": {
      id: "a-27",
      title: "Button Background Move On Hover OUT",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-27-n-4",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 700,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".cta-background",
                  selectorGuids: ["dae0b40c-c14c-427f-c9a2-11320ad9de74"],
                },
                widthValue: 131,
                widthUnit: "px",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-27-n-7",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 700,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".cta-button-text",
                  selectorGuids: ["966085c0-674b-0350-8c4c-8e3ee9c66893"],
                },
                globalSwatchId: "",
                rValue: 198,
                bValue: 1,
                gValue: 177,
                aValue: 1,
              },
            },
            {
              id: "a-27-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 700,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".cta-background",
                  selectorGuids: ["dae0b40c-c14c-427f-c9a2-11320ad9de74"],
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-6",
              actionTypeId: "STYLE_TEXT_COLOR",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 700,
                target: {
                  selector: ".cta-button-text._2",
                  selectorGuids: [
                    "966085c0-674b-0350-8c4c-8e3ee9c66893",
                    "e8280eee-b3bf-2f71-e3e6-b823182440e3",
                  ],
                },
                globalSwatchId: "",
                rValue: 0,
                bValue: 0,
                gValue: 0,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1693387805667,
    },
    "a-28": {
      id: "a-28",
      title: "Right Arrow Move On Hover",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-28-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64c7878ea5e3e133429ab75b|9f163782-0761-700d-0443-ad42462bf073",
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-28-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 700,
                target: {
                  useEventTarget: true,
                  id: "64c7878ea5e3e133429ab75b|9f163782-0761-700d-0443-ad42462bf073",
                },
                xValue: 15,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1693388443007,
    },
    "a-29": {
      id: "a-29",
      title: "Right Arrow Move On Hover Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-29-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 700,
                target: {
                  useEventTarget: true,
                  id: "64c7878ea5e3e133429ab75b|9f163782-0761-700d-0443-ad42462bf073",
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1693388443007,
    },
    "a-30": {
      id: "a-30",
      title: "Left Arrow Move On Hover",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-30-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64c7878ea5e3e133429ab75b|9f163782-0761-700d-0443-ad42462bf071",
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-30-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 700,
                target: {
                  useEventTarget: true,
                  id: "64c7878ea5e3e133429ab75b|9f163782-0761-700d-0443-ad42462bf071",
                },
                xValue: -15,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1693388500226,
    },
    "a-31": {
      id: "a-31",
      title: "Left Arrow Move On Hover Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-31-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 700,
                target: {
                  useEventTarget: true,
                  id: "64c7878ea5e3e133429ab75b|9f163782-0761-700d-0443-ad42462bf071",
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1693388500226,
    },
    "a-32": {
      id: "a-32",
      title: "Newsletter Button",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-32-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".news-arrow",
                  selectorGuids: ["404bd0ac-fd3b-4064-77b7-75594061b400"],
                },
                xValue: 0,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-32-n-3",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".news-line",
                  selectorGuids: ["ebcec82d-93a7-ebfe-ad9f-4b1170b256f8"],
                },
                widthValue: 100,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-32-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 700,
                target: {
                  selector: ".news-arrow",
                  selectorGuids: ["404bd0ac-fd3b-4064-77b7-75594061b400"],
                },
                xValue: 5,
                yValue: -5,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-32-n-4",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 700,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".news-line",
                  selectorGuids: ["ebcec82d-93a7-ebfe-ad9f-4b1170b256f8"],
                },
                widthValue: 0,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1693388914022,
    },
    "a-33": {
      id: "a-33",
      title: "Newsletter Button Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-33-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 700,
                target: {
                  selector: ".news-arrow",
                  selectorGuids: ["404bd0ac-fd3b-4064-77b7-75594061b400"],
                },
                xValue: 0,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-33-n-4",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "outQuart",
                duration: 700,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".news-line",
                  selectorGuids: ["ebcec82d-93a7-ebfe-ad9f-4b1170b256f8"],
                },
                widthValue: 100,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1693388914022,
    },
    "a-34": {
      id: "a-34",
      title: "[Blog] Text Shape Move on Scroll",
      continuousParameterGroups: [
        {
          id: "a-34-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-34-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".ba-text-shape-wrapper._1",
                      selectorGuids: [
                        "c69f579d-7805-d806-3bb0-f840b7ee9591",
                        "3c9251bd-330c-2bbe-7da0-8088b2793705",
                      ],
                    },
                    xValue: 0,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-34-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".ba-text-shape-wrapper._2",
                      selectorGuids: [
                        "c69f579d-7805-d806-3bb0-f840b7ee9591",
                        "42939ae0-e955-fd38-0883-6467415755d9",
                      ],
                    },
                    xValue: 0,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-34-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".ba-text-shape-wrapper._1",
                      selectorGuids: [
                        "c69f579d-7805-d806-3bb0-f840b7ee9591",
                        "3c9251bd-330c-2bbe-7da0-8088b2793705",
                      ],
                    },
                    xValue: -120,
                    yValue: -100,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-34-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".ba-text-shape-wrapper._2",
                      selectorGuids: [
                        "c69f579d-7805-d806-3bb0-f840b7ee9591",
                        "42939ae0-e955-fd38-0883-6467415755d9",
                      ],
                    },
                    xValue: 70,
                    yValue: -130,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1693475585716,
    },
    "a-35": {
      id: "a-35",
      title: "[Blog] Editorial Parallax",
      continuousParameterGroups: [
        {
          id: "a-35-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-35-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".be-wrapper._2",
                      selectorGuids: [
                        "3f3eb418-821d-9f27-7b73-359bdf31f6dc",
                        "65703d0e-44c0-1ffa-fc8f-4163f87c6c83",
                      ],
                    },
                    xValue: 0,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-35-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".be-wrapper._1",
                      selectorGuids: [
                        "3f3eb418-821d-9f27-7b73-359bdf31f6dc",
                        "406154c8-df09-b7b3-b13b-2e977ab50711",
                      ],
                    },
                    xValue: null,
                    yValue: 60,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-35-n-5",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".be-wrapper._4",
                      selectorGuids: [
                        "3f3eb418-821d-9f27-7b73-359bdf31f6dc",
                        "f3bcfa71-e81e-250a-1dcc-87b2388f6814",
                      ],
                    },
                    xValue: 0,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-35-n-7",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".be-wrapper._3",
                      selectorGuids: [
                        "3f3eb418-821d-9f27-7b73-359bdf31f6dc",
                        "3e84440b-1fcd-4eed-c199-2fcfd8b52c37",
                      ],
                    },
                    xValue: 0,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-35-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".be-wrapper._2",
                      selectorGuids: [
                        "3f3eb418-821d-9f27-7b73-359bdf31f6dc",
                        "65703d0e-44c0-1ffa-fc8f-4163f87c6c83",
                      ],
                    },
                    xValue: 40,
                    yValue: -30,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-35-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".be-wrapper._1",
                      selectorGuids: [
                        "3f3eb418-821d-9f27-7b73-359bdf31f6dc",
                        "406154c8-df09-b7b3-b13b-2e977ab50711",
                      ],
                    },
                    xValue: null,
                    yValue: -160,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-35-n-6",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".be-wrapper._4",
                      selectorGuids: [
                        "3f3eb418-821d-9f27-7b73-359bdf31f6dc",
                        "f3bcfa71-e81e-250a-1dcc-87b2388f6814",
                      ],
                    },
                    xValue: 50,
                    yValue: -90,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-35-n-8",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".be-wrapper._3",
                      selectorGuids: [
                        "3f3eb418-821d-9f27-7b73-359bdf31f6dc",
                        "3e84440b-1fcd-4eed-c199-2fcfd8b52c37",
                      ],
                    },
                    xValue: -70,
                    yValue: -80,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1693475738865,
    },
    "a-37": {
      id: "a-37",
      title: "Navbar Slide In",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-37-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuad",
                duration: 400,
                target: {
                  selector: ".navbar-fixed",
                  selectorGuids: ["3ae5116b-cfcc-753b-a3db-1d0b37b5dff5"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1693483290124,
    },
    "a-36": {
      id: "a-36",
      title: "Navbar Slide Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-36-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuad",
                duration: 400,
                target: {
                  selector: ".navbar-fixed",
                  selectorGuids: ["3ae5116b-cfcc-753b-a3db-1d0b37b5dff5"],
                },
                yValue: -170,
                xUnit: "PX",
                yUnit: "%",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1693481575509,
    },
    "a-7": {
      id: "a-7",
      title: "About Hero Animation",
      continuousParameterGroups: [
        {
          id: "a-7-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 34,
              actionItems: [
                {
                  id: "a-7-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".ah-mask",
                      selectorGuids: ["300849a2-ec43-ec70-5fb4-0f48ec4a526f"],
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-7-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".text-shape-wrapper._1",
                      selectorGuids: [
                        "9ed14ac7-57d3-357e-fb94-29d9fd927373",
                        "8e7e58b2-afff-8fe3-1c4b-4f4a2f8d6238",
                      ],
                    },
                    xValue: null,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-7-n-5",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".text-shape-wrapper._2",
                      selectorGuids: [
                        "9ed14ac7-57d3-357e-fb94-29d9fd927373",
                        "d65e1799-5af8-d794-7865-40e81e6553fc",
                      ],
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-7-n-7",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".text-shape-wrapper._3",
                      selectorGuids: [
                        "9ed14ac7-57d3-357e-fb94-29d9fd927373",
                        "3b342249-9c80-f8fa-f8fc-249513224b95",
                      ],
                    },
                    xValue: null,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 70,
              actionItems: [
                {
                  id: "a-7-n-8",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".text-shape-wrapper._3",
                      selectorGuids: [
                        "9ed14ac7-57d3-357e-fb94-29d9fd927373",
                        "3b342249-9c80-f8fa-f8fc-249513224b95",
                      ],
                    },
                    xValue: null,
                    yValue: -270,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-7-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      selector: ".ah-mask",
                      selectorGuids: ["300849a2-ec43-ec70-5fb4-0f48ec4a526f"],
                    },
                    yValue: 100,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-7-n-6",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".text-shape-wrapper._2",
                      selectorGuids: [
                        "9ed14ac7-57d3-357e-fb94-29d9fd927373",
                        "d65e1799-5af8-d794-7865-40e81e6553fc",
                      ],
                    },
                    yValue: -160,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-7-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".text-shape-wrapper._1",
                      selectorGuids: [
                        "9ed14ac7-57d3-357e-fb94-29d9fd927373",
                        "8e7e58b2-afff-8fe3-1c4b-4f4a2f8d6238",
                      ],
                    },
                    xValue: null,
                    yValue: -240,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1692353468101,
    },
    "a-39": {
      id: "a-39",
      title: "Hide Fixed Navigation",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-39-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".navbar-fixed",
                  selectorGuids: ["3ae5116b-cfcc-753b-a3db-1d0b37b5dff5"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-39-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".navbar-fixed",
                  selectorGuids: ["3ae5116b-cfcc-753b-a3db-1d0b37b5dff5"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-39-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuad",
                duration: 500,
                target: {
                  selector: ".navbar-fixed",
                  selectorGuids: ["3ae5116b-cfcc-753b-a3db-1d0b37b5dff5"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-39-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 500,
                easing: "",
                duration: 0,
                target: {
                  selector: ".navbar-fixed",
                  selectorGuids: ["3ae5116b-cfcc-753b-a3db-1d0b37b5dff5"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1693817728465,
    },
    "a-40": {
      id: "a-40",
      title: "Show Fixed Navigation",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-40-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuad",
                duration: 500,
                target: {
                  selector: ".navbar-fixed",
                  selectorGuids: ["3ae5116b-cfcc-753b-a3db-1d0b37b5dff5"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-40-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".navbar-fixed",
                  selectorGuids: ["3ae5116b-cfcc-753b-a3db-1d0b37b5dff5"],
                },
                value: "flex",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1693817728465,
    },
  },
  site: {
    mediaQueries: [
      { key: "main", min: 992, max: 10000 },
      { key: "medium", min: 768, max: 991 },
      { key: "small", min: 480, max: 767 },
      { key: "tiny", min: 0, max: 479 },
    ],
  },
});
