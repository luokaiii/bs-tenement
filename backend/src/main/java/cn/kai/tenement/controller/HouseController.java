package cn.kai.tenement.controller;

import cn.kai.tenement.model.House;
import cn.kai.tenement.service.BaseService;
import cn.kai.tenement.service.HouseService;
import cn.kai.tenement.service.OperateLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

/**
 * @description: 房屋接口
 * @create: 2020-03-04
 * @author: luokaiii
 */
@RestController
@RequestMapping("/house")
public class HouseController extends BaseController<House, Integer> {

    private final HouseService houseService;

    private final OperateLogService operateLogService;

    private final EntityManager entityManager;

    @Autowired
    public HouseController(HouseService houseService,
                           OperateLogService operateLogService,
                           EntityManager entityManager) {
        this.houseService = houseService;
        this.operateLogService = operateLogService;
        this.entityManager = entityManager;
    }

    @Override
    public BaseService<House, Integer> getService() {
        return houseService;
    }

    @Override
    public ResponseEntity<Page<House>> findByPage(House ex, Pageable pageable) {
        // 名称、关键词、小区全部模糊匹配
        final ExampleMatcher matcher = ExampleMatcher.matching()
                .withMatcher("name", ExampleMatcher.GenericPropertyMatcher.of(ExampleMatcher.StringMatcher.CONTAINING))
                .withMatcher("keys", ExampleMatcher.GenericPropertyMatcher.of(ExampleMatcher.StringMatcher.CONTAINING))
                .withMatcher("estate", ExampleMatcher.GenericPropertyMatcher.of(ExampleMatcher.StringMatcher.CONTAINING));
        final Example<House> of = Example.of(ex, matcher);
        final Page<House> all = houseService.findAll(of, pageable);
        return ResponseEntity.ok(all);
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Page<House>> findByNames(@PathVariable String name,
                                                   @RequestParam("type") House.Type type,
                                                   @PageableDefault Pageable pageable) {
        final Page<House> page = houseService.findByNameKeys(type, name, pageable);
        return ResponseEntity.ok(page);
    }

    @PutMapping("/{id}/status/{status}")
    public ResponseEntity updateStatus(HttpServletRequest request,
                                       Authentication authentication,
                                       @PathVariable Integer id,
                                       @PathVariable House.Status status) {
        final Optional<House> optional = houseService.findById(id);

        optional.ifPresent(v -> {
            v.setStatus(status);
            final String format = String.format("更改房屋[%s]的状态为[%s]", v.getName(), v.getStatus());
            operateLogService.saveLog(request, authentication, format);
            houseService.save(v);
        });
        return optional.map(v -> ResponseEntity.noContent().build())
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/like")
    public ResponseEntity updateLike(@PathVariable Integer id) {
        final Optional<House> optional = houseService.findById(id);

        optional.ifPresent(v -> {
            if (v.getLikeCount() == null) v.setLikeCount(0);
            v.setLikeCount(v.getLikeCount() + 1);
            houseService.save(v);
        });
        return optional.map(v -> ResponseEntity.noContent().build())
                .orElse(ResponseEntity.notFound().build());
    }

}
