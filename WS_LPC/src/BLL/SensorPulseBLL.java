package BLL;

import BOL.SensorPulseBOL;
import DAL.SensorPulseDAL;
import org.json.JSONException;
import org.json.JSONObject;

import java.sql.SQLException;
import java.text.ParseException;

public class SensorPulseBLL {
    public  void SetData(String data) throws ParseException, SQLException, JSONException {

        try{

            SensorPulseBOL pulseBOL = new SensorPulseBOL();
            SensorPulseDAL pulseDAL = new SensorPulseDAL();

            JSONObject object = new JSONObject(data);
              pulseBOL.setPulse(object.getDouble("pulse"));
              pulseBOL.setCreatedBy(object.getString("createdBy"));
              pulseBOL.setRoom(object.getString("room"));

            pulseDAL.SetDataDal(pulseBOL);

        }
        catch (Exception exe){
            exe.printStackTrace();
        }



    }
}
