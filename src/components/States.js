import React, { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import sudanGeoJSON from "../States.json";

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
};

function States({ onStateSelect }) {
    const [stats, setStats] = useState({});
    const [geoData, setGeoData] = useState(null);

    useEffect(() => {
        // تحميل بيانات الولايات من ملف GeoJSON
        setGeoData(sudanGeoJSON);

        // تحميل بيانات الإحصائيات من السيرفر
        fetch("cholera-map-back.up.railway.app/api/stats")
            .then(res => res.json())
            .then(data => {
                const normalizedStats = {};
                data.data.forEach(item => {
                    const stateName = item.state.trim().toLowerCase(); // توحيد اسم الولاية
                    normalizedStats[stateName] = item;
                });
                setStats(normalizedStats);
            })
            .catch(err => console.error("❌ خطأ في تحميل البيانات:", err));
    }, []);

    // تعريف شكل كل ولاية
    const onEachFeature = (feature, layer) => {
        const originalName = feature.properties.State;
        const nameKey = originalName.trim().toLowerCase(); // توحيد الاسم
        const stat = stats[nameKey];

        let popupContent = `<div dir="rtl"><strong>${originalName}</strong><br/>`;

        if (stat) {
            popupContent += `
                الإصابات: ${stat.total_cases}<br/>
                التعافي: ${stat.total_recovered}<br/>
                الوفيات: ${stat.total_deaths}
            `;
        } else {
            popupContent += `لا توجد بيانات`;
        }

        popupContent += `</div>`;

        layer.bindPopup(popupContent);
        layer.on("click", () => {
            layer.openPopup();
            if (onStateSelect && stat) {
                onStateSelect(stat);
            }
        });
    };

    // تحديد نمط العرض لكل ولاية
    const styleFeature = (feature) => {
        const nameKey = feature.properties.State.trim().toLowerCase(); // توحيد الاسم
        const stat = stats[nameKey];
        const cases = stat ? parseInt(stat.total_cases) : 0;

        return {
            fillColor: getColor(cases),
            weight: 1,
            opacity: 1,
            color: "white",
            dashArray: "3",
            fillOpacity: 0.7,
        };
    };

    // ✅ لا تعرض الخريطة إلا بعد تحميل البيانات
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
