package cn.kai.tenement.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

/**
 * @description: 文件上传
 * @create: 2020-03-05
 * @author: luokaiii
 */
@RestController
@RequestMapping("/file")
public class FileController {

    private final String path;

    public FileController(@Value("${file.location}") String path) {
        this.path = path;
    }

    private File getFolder(String prefix) {
        final File file = new File(prefix);
        return createFile(file);
    }

    private File createFile(File file) {
        if (!file.exists() && !file.isDirectory()) {
            final boolean mkdirs = file.mkdirs();
            if (mkdirs) {
                System.out.println("创建目录");
            }
        }
        return file;
    }

    /**
     * 文件上传服务
     */
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(MultipartFile file) {
        final UUID uuid = UUID.randomUUID();
        final String prefix = path + uuid;
        final File folder = getFolder(prefix);
        final String filename = folder + File.separator + file.getOriginalFilename();
        try (InputStream stream = file.getInputStream(); FileOutputStream outputStream = new FileOutputStream(filename)) {
            final byte[] bytes = new byte[1024];
            while (stream.read(bytes) != -1) {
                outputStream.write(bytes);
            }
            return ResponseEntity.ok("/api/file/" + uuid + File.separator + file.getOriginalFilename());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity.badRequest().build();
    }

    /**
     * 文件代理服务
     */
    @GetMapping("/{uuid}/{filename}")
    public void getFile(@PathVariable String uuid,
                        @PathVariable String filename,
                        HttpServletResponse response) throws IOException {
        final Path path = Paths.get(this.path + uuid + File.separator, filename);
        if (Files.exists(path)) {
            response.setContentType("application/x-gzip");
            response.addHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(filename, "UTF-8"));
            Files.copy(path, response.getOutputStream());
        }
    }
}
