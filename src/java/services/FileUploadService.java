package services;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.io.FileNotFoundException;
import javax.ws.rs.Produces;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

@Path("/upload")
public class FileUploadService {

    private static final String UPLOAD_FOLDER = (System.getProperty("com.sun.aas.instanceRootURI").replace("%20", " ") + "applications/").substring(6);
    public FileUploadService() {
    }
    @Context
    private UriInfo context;
    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces({"text/xml"})
    public Response uploadFile(
            @FormDataParam("file") InputStream uploadedInputStream,
            @FormDataParam("file") FormDataContentDisposition fileDetail, 
            @FormDataParam("location") FormDataContentDisposition location) {
        // check if all form parameters are provided
        if (uploadedInputStream == null || fileDetail == null) {
            return Response.status(400).entity("Invalid form data").build();
        }
        String uploadedFileLocation = UPLOAD_FOLDER+ location.getFileName() +"/assets/books/" + fileDetail.getFileName();
        try {
            saveToFile(uploadedInputStream, uploadedFileLocation);
        } catch (Exception e) {
            return Response.status(500).entity("Can not save file").build();
        }
        return Response.status(200)
                .entity("File saved to " + uploadedFileLocation).build();
    }

    private void saveToFile(InputStream inStream, String target) throws FileNotFoundException, IOException{
        OutputStream out = null;
        int read = 0;
        byte[] bytes = new byte[1024];
        out = new FileOutputStream(new File(target));
        while ((read = inStream.read(bytes)) != -1) {
            out.write(bytes, 0, read);
        }
        out.flush();
        out.close();
    }

    private void createFolderIfNotExists(String dirName) {
        File theDir = new File(dirName);
        if (!theDir.exists()) {
            theDir.mkdir();
        }
    }
}
