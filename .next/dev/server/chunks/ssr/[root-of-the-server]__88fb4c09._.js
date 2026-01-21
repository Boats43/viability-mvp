module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/viability-mvp/src/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ViabilityMVP
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$viability$2d$mvp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/viability-mvp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$viability$2d$mvp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/viability-mvp/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$viability$2d$mvp$2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/viability-mvp/node_modules/react-chartjs-2/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$viability$2d$mvp$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/viability-mvp/node_modules/chart.js/dist/chart.js [app-ssr] (ecmascript) <locals>");
'use client';
;
;
;
;
__TURBOPACK__imported__module__$5b$project$5d2f$viability$2d$mvp$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Chart"].register(__TURBOPACK__imported__module__$5b$project$5d2f$viability$2d$mvp$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LineElement"], __TURBOPACK__imported__module__$5b$project$5d2f$viability$2d$mvp$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["CategoryScale"], __TURBOPACK__imported__module__$5b$project$5d2f$viability$2d$mvp$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["LinearScale"], __TURBOPACK__imported__module__$5b$project$5d2f$viability$2d$mvp$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["PointElement"], __TURBOPACK__imported__module__$5b$project$5d2f$viability$2d$mvp$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Legend"], __TURBOPACK__imported__module__$5b$project$5d2f$viability$2d$mvp$2f$node_modules$2f$chart$2e$js$2f$dist$2f$chart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Tooltip"]);
function ViabilityMVP() {
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$viability$2d$mvp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        divergence: [],
        correction: [],
        entropy: [],
        viability: [],
        time: []
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$viability$2d$mvp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const T = 120; // time horizon
        const n = 10; // state dimension
        const alpha = 1.15; // correction strength
        const entropyFloor = 0.6; // minimum entropy required
        const noiseLevel = 0.03; // environmental disturbance
        let Q = Array.from({
            length: n
        }, ()=>Math.random());
        normalize(Q);
        const entropy = [];
        const divergence = [];
        const correction = [];
        const viability = [];
        const time = [];
        for(let t = 0; t < T; t++){
            const P = Array.from({
                length: n
            }, ()=>Math.random() + 0.3);
            normalize(P);
            const H = -Q.reduce((acc, p)=>acc + p * Math.log(p), 0);
            const D = Q.reduce((acc, q, i)=>acc + q * Math.log(q / P[i]), 0);
            const C = alpha * D;
            const isViable = C > D && H > entropyFloor;
            entropy.push(H);
            divergence.push(D);
            correction.push(C);
            viability.push(isViable);
            time.push(t);
            if (!isViable) break;
            for(let i = 0; i < n; i++){
                Q[i] = Q[i] - alpha * (Q[i] - P[i]);
            }
            for(let i = 0; i < n; i++){
                Q[i] += noiseLevel * (Math.random() - 0.5);
                if (Q[i] < 0) Q[i] = 1e-6;
            }
            normalize(Q);
        }
        setData({
            divergence,
            correction,
            entropy,
            viability,
            time
        });
    }, []);
    const chartData = {
        labels: data.time,
        datasets: [
            {
                label: "Divergence (D)",
                data: data.divergence,
                borderColor: "red"
            },
            {
                label: "Correction (C)",
                data: data.correction,
                borderColor: "green"
            },
            {
                label: "Entropy (H)",
                data: data.entropy,
                borderColor: "blue"
            }
        ]
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$viability$2d$mvp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 grid gap-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$viability$2d$mvp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-bold",
                children: "Viability Law — Dynamic MVP"
            }, void 0, false, {
                fileName: "[project]/viability-mvp/src/app/page.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$viability$2d$mvp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-4 rounded-xl shadow",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$viability$2d$mvp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$viability$2d$mvp$2f$node_modules$2f$react$2d$chartjs$2d$2$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Line"], {
                    data: chartData
                }, void 0, false, {
                    fileName: "[project]/viability-mvp/src/app/page.tsx",
                    lineNumber: 108,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/viability-mvp/src/app/page.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$viability$2d$mvp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-4 rounded-xl shadow text-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$viability$2d$mvp$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "Final Status:"
                    }, void 0, false, {
                        fileName: "[project]/viability-mvp/src/app/page.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    " ",
                    data.viability.length ? data.viability.at(-1) ? "✅ Persistent (Viable)" : "❌ Collapse (Failure Envelope)" : "Loading..."
                ]
            }, void 0, true, {
                fileName: "[project]/viability-mvp/src/app/page.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/viability-mvp/src/app/page.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
function normalize(v) {
    const sum = v.reduce((a, b)=>a + b, 0);
    for(let i = 0; i < v.length; i++)v[i] /= sum;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__88fb4c09._.js.map