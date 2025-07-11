import React, { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import sudanGeoJSON from "../States.json";

<<<<<<< HEAD
// دالة لتحديد اللون حسب عدد الإصابات
const getColor = (cases) => {
    return cases > 1000 ? "#800026" :
           cases > 500  ? "#BD0026" :
           cases > 200  ? "#E31A1C" :
           cases > 100  ? "#FC4E2A" :
           cases > 50   ? "#FD8D3C" :
           cases > 10   ? "#FEB24C" :
           cases > 0    ? "#FED976" :
                         "#FFEDA0";
=======
const getColor = (cases) => {
    return  cases > 1000 ? "#800026" :
            cases > 500  ? "#BD0026" :
            cases > 200  ? "#E31A1C" :
            cases > 100  ? "#FC4E2A" :
            cases > 50   ? "#FD8D3C" :
            cases > 10   ? "#FEB24C" :
            cases > 0    ? "#FED976" :
                          "#FFEDA0";
>>>>>>> 61c2562710d4e23ba1792f7f606622ec08810156
};

function States({ onStateSelect }) {
    const [stats, setStats] = useState({});
    const [geoData, setGeoData] = useState(null);

<<<<<<< HEAD
    useEffect(() => {
        // تحميل بيانات الولايات من ملف GeoJSON
        setGeoData(sudanGeoJSON);

        // تحميل بيانات الإحصائيات من السيرفر
=======
    // توحيد الاسم
    const normalize = (str) => str.trim().replace("ولاية ", "").replace(/\s+/g, "");

    useEffect(() => {
        // تحميل البيانات الجغرافية
        setGeoData(sudanGeoJSON);

        // تحميل بيانات الإحصاءات
>>>>>>> 61c2562710d4e23ba1792f7f606622ec08810156
        fetch("http://localhost:5000/api/stats")
            .then(res => res.json())
            .then(data => {
                const normalizedStats = {};
                data.data.forEach(item => {
<<<<<<< HEAD
                    const stateName = item.state.trim().toLowerCase(); // توحيد اسم الولاية
                    normalizedStats[stateName] = item;
=======
                    normalizedStats[normalize(item.state)] = item;
>>>>>>> 61c2562710d4e23ba1792f7f606622ec08810156
                });
                setStats(normalizedStats);
            })
            .catch(err => console.error("❌ خطأ في تحميل البيانات:", err));
    }, []);

<<<<<<< HEAD
    // تعريف شكل كل ولاية
    const onEachFeature = (feature, layer) => {
        const originalName = feature.properties.State;
        const nameKey = originalName.trim().toLowerCase(); // توحيد الاسم
=======
    const onEachFeature = (feature, layer) => {
        const originalName = feature.properties.State;
        const nameKey = normalize(originalName);
>>>>>>> 61c2562710d4e23ba1792f7f606622ec08810156
        const stat = stats[nameKey];

        let popupContent = `<div dir="rtl"><strong>${originalName}</strong><br/>`;

        if (stat) {
            popupContent += `
<<<<<<< HEAD
                الإصابات: ${stat.total_cases}<br/>
                التعافي: ${stat.total_recovered}<br/>
                الوفيات: ${stat.total_deaths}
=======
                الإصابات: ${stat['total_cases']}<br/>
                التعافي: ${stat['total_recovered']}<br/>
                الوفيات: ${stat['total_death']}
>>>>>>> 61c2562710d4e23ba1792f7f606622ec08810156
            `;
        } else {
            popupContent += `لا توجد بيانات`;
        }

        popupContent += `</div>`;

        layer.bindPopup(popupContent);
<<<<<<< HEAD

=======
>>>>>>> 61c2562710d4e23ba1792f7f606622ec08810156
        layer.on("click", () => {
            layer.openPopup();
            if (onStateSelect && stat) {
                onStateSelect(stat);
            }
        });
    };

<<<<<<< HEAD
    // تحديد نمط العرض لكل ولاية
    const styleFeature = (feature) => {
        const nameKey = feature.properties.State.trim().toLowerCase(); // توحيد الاسم
        const stat = stats[nameKey];
        const cases = stat ? parseInt(stat.total_cases) : 0;
=======
    const styleFeature = (feature) => {
        const nameKey = normalize(feature.properties.State);
        const stat = stats[nameKey];
        const cases = stat ? parseInt(stat.cases) : 0;
>>>>>>> 61c2562710d4e23ba1792f7f606622ec08810156

        return {
            fillColor: getColor(cases),
            weight: 1,
            opacity: 1,
            color: "white",
            dashArray: "3",
            fillOpacity: 0.7,
        };
    };

<<<<<<< HEAD
    // ✅ لا تعرض الخريطة إلا بعد تحميل البيانات
=======
    // ✅ لا تعرض GeoJSON إلا بعد تحميل البيانات
>>>>>>> 61c2562710d4e23ba1792f7f606622ec08810156
    if (!geoData || Object.keys(stats).length === 0) {
        return <p className="text-center text-light mt-4">جارٍ تحميل البيانات...</p>;
    }

    return (
        <GeoJSON 
            data={geoData} 
            onEachFeature={onEachFeature} 
            style={styleFeature} 
        />
    );
}

export default States;
