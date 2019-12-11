
import BLL.SensorPulseBLL;
import org.json.JSONException;

import java.net.*;
import java.io.*;
import java.sql.SQLException;
import java.text.ParseException;

public class Main {
    //objects
    static ServerSocket ss;
    static Socket s;
    static InputStreamReader isr;
    static BufferedReader br;
    static PrintStream ps;
    public static void main(String[] args) {
        //thread
        Thread socketThread = new Thread(new Runnable()
        {
            @Override
            public void run(){
                try
                {
                    System.out.println("Opening Socket...");//status
                    ss = new ServerSocket(8080 ); // socket port
                    System.out.println("Socket opened...");//status
                    //keep reading 
                    while(true){
                        s = ss.accept();//read data 
                        isr = new InputStreamReader(s.getInputStream());//read stream
                        br = new BufferedReader(isr);//lector de buffer
                        String data = br.readLine();//read data
                        System.out.println(data+"\n");//show data
                        //send acknowledge to client
                        if(data != null){
                            ps = new PrintStream(s.getOutputStream());//stream writter
                            ps.println("Data received...");
                            SensorPulseBLL s = new SensorPulseBLL();
                            s.SetData(data);
                        }
                    }
                }
                catch(IOException ex){
                    System.out.println(ex.getMessage());
                }
                catch (ParseException e) {
                    e.printStackTrace();
                } catch (JSONException e) {
                    e.printStackTrace();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        });
        socketThread.start();
    }
}