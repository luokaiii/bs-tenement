package cn.kai.tenement.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * @description: 房屋
 * @create: 2020-03-04
 * @author: luokaiii
 */
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "t_house")
@Data
public class House extends BaseEntity {
    /* 房屋名称 */
    private String name;
    /* 关键词 */
    private String keys;
    /* 销售类型 */
    private Type type;
    /* 封面 */
    private String cover;
    /* 详情图 */
    private String pictures;
    /* 所在省 */
    private String province;
    /* 所在市 */
    private String city;
    /* 详细地址 */
    private String address;
    /* 小区名称 */
    private String estate;
    /* 付款方式 */
    private PriceType priceType;
    /* 价格 */
    private Double price;
    /* 面积 */
    private Integer area;
    /* 楼层 */
    private Integer floor;
    /* 总楼层 */
    private Integer floors;
    /* 房屋类型 */
    private OwnerType ownerType;
    /* 户型 */
    private Integer plan;
    /* 电费 */
    private Double electric;
    /* 水费 */
    private Double water;
    /* 网费 */
    private Double gmfs;
    /* 发布人 */
    private Integer userId;
    /* 发布人姓名 */
    private String userNickname;
    /* 发布人头像 */
    private String userProfile;
    /* 发布人手机 */
    private String userPhone;
    /* 喜欢的人数 */
    private Integer likeCount;
    /* 状态 */
    private Status status;
    /* 创建时间 */
    private LocalDateTime createTime;

    public enum Type {
        // 出售
        SELL,
        // 出租
        RENT
    }

    public enum OwnerType {
        // 整租
        ALL,
        // 合租
        PART,
        // 公寓
        APART
    }

    public enum PriceType {
        // 月付
        MONTH,
        // 季付
        QUARTER,
        // 半年付
        HALF,
        // 年付
        YEAR,
        // 一次性付清
        ALL
    }

    public enum Status {
        // 新创建
        CREATED,
        // 已添加，审核通过
        ADDED,
        // 被下架
        OUT,
        // 审核失败
        FAILED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Override
    public Integer getId() {
        return super.getId();
    }
}
