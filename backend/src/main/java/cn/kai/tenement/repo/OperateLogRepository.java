package cn.kai.tenement.repo;

import cn.kai.tenement.model.OperateLog;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @description: 日志接口
 * @create: 2020-03-04
 * @author: luokaiii
 */
public interface OperateLogRepository extends JpaRepository<OperateLog, Integer> {
}
