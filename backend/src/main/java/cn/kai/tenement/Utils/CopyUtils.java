package cn.kai.tenement.Utils;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.util.Assert;

import java.util.HashSet;
import java.util.Set;

/**
 * 复制非空属性的工具类
 */
public class CopyUtils {

    private static String[] getNullPropertyNames(Object source) {
        final BeanWrapper src = new BeanWrapperImpl(source);
        java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();

        Set<String> emptyNames = new HashSet<>();
        for (java.beans.PropertyDescriptor pd : pds) {
            Object srcValue = src.getPropertyValue(pd.getName());
            if (srcValue == null) emptyNames.add(pd.getName());
        }
        String[] result = new String[emptyNames.size()];
        return emptyNames.toArray(result);
    }

    public static void copyPropertiesIgnoreNull(Object src, Object target) {
        BeanUtils.copyProperties(src, target, getNullPropertyNames(src));
    }

    public static <T> T copyPropertiesIgnoreNull(Object src, Class<T> target) {
        Assert.notNull(target, "Target Is Not Null");

        T instance = null;
        try {
            instance = target.newInstance();
        } catch (InstantiationException | IllegalAccessException e) {
            e.printStackTrace();
        }

        assert instance != null;
        BeanUtils.copyProperties(src, instance, getNullPropertyNames(src));

        return instance;
    }

}
