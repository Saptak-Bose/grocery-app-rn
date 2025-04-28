import axios from "axios";
import { GOOGLE_MAP_API } from "./config";
import { updateUserLocation } from "./auth-service";

export const reverseGeocode = async (
  lat: number,
  long: number,
  setUser: (user: any) => void
) => {
  try {
    const res = await axios.get(
      `https://maps.gomaps.pro/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_MAP_API}`
    );

    if (res.data.status === "OK") {
      const address = res.data.results[0].formatted_address;
      updateUserLocation(
        {
          liveLocation: {
            latitude: lat,
            longitude: long,
          },
          address,
        },
        setUser
      );
    } else {
      console.error("Geo code failed...", res.data);
    }
  } catch (error) {
    console.log("Geo code failed...", error);
  }
};
