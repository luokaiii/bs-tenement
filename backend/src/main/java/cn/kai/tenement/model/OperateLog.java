package cn.kai.tenement.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;

/**
 * @description: 日志记录
 * @create: 2020-03-04
 * @author: luokaiii
 */
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "t_operate_log")
@Data
public class OperateLog extends BaseEntity {

    private Integer userId;

    private String username;

    private String operate;

    private LocalDateTime time;

    private String ip;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Override
    public Integer getId() {
        return super.getId();
    }

    public static OperateLog build(Integer userId, String username, String operate, HttpServletRequest request) {
        final OperateLog log = new OperateLog();
        log.setUserId(userId);
        log.setUsername(username);
        log.setOperate(operate);
        log.setTime(LocalDateTime.now());
        log.setIp(request.getRemoteAddr());
        return log;
    }
}
