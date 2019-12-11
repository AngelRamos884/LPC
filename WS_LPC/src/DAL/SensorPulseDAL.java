package DAL;

import BOL.SensorPulseBOL;
import Database.MySqlConn;
import org.json.JSONException;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;

public class SensorPulseDAL extends MySqlConn {
    public void SetDataDal(SensorPulseBOL data)  throws ParseException, SQLException, JSONException {

        try{
            //Instanacia para mandar a llamar al procedimiento
            CallableStatement stmt = connexion().prepareCall("{call setPulse(?,?,?)}");
            //Set de cada uno de los parametros que recibe el procedimiento
            stmt.setDouble(1, data.getPulse());
            stmt.setString(2, data.getCreatedBy());
            stmt.setString(3, data.getRoom());
            //ejecucion de query
            ResultSet rs = stmt.executeQuery();
//            //Si todo sale bien, el metodo retorna un OK
//            result = "OK";

        }//Esxeption para atrapar el error
        catch (Exception e){
//            result = e.getMessage().toString();
            e.printStackTrace();
        }

//        return result;

    }
}
