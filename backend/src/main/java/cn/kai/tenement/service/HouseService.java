package cn.kai.tenement.service;

import cn.kai.tenement.model.House;
import cn.kai.tenement.repo.HouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @description: 房屋服务
 * @create: 2020-03-04
 * @author: luokaiii
 */
@Service
public class HouseService extends BaseService<House, Integer> {

    private final HouseRepository houseRepository;

    @Autowired
    public HouseService(HouseRepository houseRepository) {
        this.houseRepository = houseRepository;
    }

    @Override
    public JpaRepository<House, Integer> getRepository() {
        return houseRepository;
    }

    public Page<House> findByNameKeys(House.Type type, String name, Pageable pageable) {
        name = "%" + name + "%";
        final List<House> list = houseRepository.findAllByNameLikeOrKeysLikeOrEstateLike(name, name, name);
        final List<House> result = list.stream().filter(v -> v.getType() == type && v.getStatus() == House.Status.ADDED).collect(Collectors.toList());

        if (result.size() < pageable.getPageNumber() * pageable.getPageSize())
            return Page.empty();

        if (result.size() < (pageable.getPageNumber() + 1) * pageable.getPageSize()) {
            final List<House> houses = result.subList(pageable.getPageNumber() * pageable.getPageSize(), result.size());
            return new PageImpl<>(houses, pageable, result.size());
        } else {
            final List<House> houses = result.subList(pageable.getPageNumber() * pageable.getPageSize(), (pageable.getPageNumber() + 1) * pageable.getPageSize());
            return new PageImpl<>(houses, pageable, result.size());
        }
    }
}
