package Database;
import java.sql.Connection;
import java.sql.DriverManager;
public class MySqlConn {
    //clase que hace la conexion
    public Connection connexion() {
        //Se declara un objeto de tipo conexion de la libreria
        Connection conectar = null;
        try {
            //Se manda a llamar el driver de la libreria
            Class.forName("com.mysql.cj.jdbc.Driver");
            //Se manda a llamar la conexion a la base de datos
            conectar = DriverManager.getConnection("jdbc:mysql://localhost:3306/lpc?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC", "root", "data");
//            System.out.println("Database Connection Success");
        } catch (Exception e) {
            //Si algo sale mal se cacha la exception
            System.out.println(e.getMessage());
        }
        return conectar;
    }

}
