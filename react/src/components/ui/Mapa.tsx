import React, { useEffect } from 'react';
import { Loader } from "@googlemaps/js-api-loader";

export const Mapa = () => {

    useEffect(() => {
        const loader = new Loader({
            apiKey: "AIzaSyARlsiPBIt9Cv5EiSNKTZVENYMZwJo-KJ0",
            version: "weekly",
        });

        loader.load().then(async () => {
            const google = await (window as any).google;
            const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                center: { lat: 24.131, lng: -110.3 },
                zoom: 13,
            });

            const polygonCoords: google.maps.LatLngLiteral[] = [
                { lat: 24.131, lng: -110.3 },
                { lat: 24.132, lng: -110.32 },
                { lat: 24.140, lng: -110.32 },
            ];

            const polygon = new google.maps.Polygon({
                paths: polygonCoords,
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
            });

            // Agregar información adicional al polígono
            (polygon as any).customInfo = {
                name: "Mi Polígono",
                description: "Este es un polígono de ejemplo",
                id: 1
            };
            polygon.setMap(map);
            // Agregar evento de clic al polígono
            polygon.addListener("click", () => {
                const info = (polygon as any).customInfo;
                alert(`Polígono clicado!\nNombre: ${info.name}\nDescripción: ${info.description}\nID: ${info.id}`);
            });
        });
    }, []);

    return (
        <div className='h-full'>
            <div id="map" className='w-full h-full'></div>
        </div>
    )
}
