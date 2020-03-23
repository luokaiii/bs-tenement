package cn.kai.tenement.service;

import cn.kai.tenement.model.MyUserDetails;
import cn.kai.tenement.model.OperateLog;
import cn.kai.tenement.repo.OperateLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

/**
 * @description: 日志
 * @create: 2020-03-04
 * @author: luokaiii
 */
@Service
public class OperateLogService extends BaseService<OperateLog, Integer> {

    private final OperateLogRepository repository;

    @Autowired
    public OperateLogService(OperateLogRepository repository) {
        this.repository = repository;
    }

    @Override
    public JpaRepository<OperateLog, Integer> getRepository() {
        return repository;
    }

    public void saveLog(HttpServletRequest request, Authentication authentication, String operate) {
        Object principal = authentication.getPrincipal();
        if (principal instanceof MyUserDetails) {
            final OperateLog log = OperateLog.build(((MyUserDetails) principal).getId(), ((MyUserDetails) principal).getNickname(), operate, request);
            repository.save(log);
        }
    }
}
