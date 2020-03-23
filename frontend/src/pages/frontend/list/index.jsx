import React, { useState, useEffect, useCallback } from "react";
import { Form, List, Button, Input, Radio, Divider } from "antd";

import { HouseListText } from "../../../components/constants";
import { getByPage, getByName } from "../../../service/HouseApi";
import DetailsCard from "../../../components/DetailsCard";
import "./index.less";

export default Form.create()(({ match, form }) => {
  const { type } = match.params;
  const { getFieldDecorator } = form;
  const [data, setData] = useState([]);
  const [search, setSearch] = useState();
  const [page, setPage] = useState(0);
  const [last, setLast] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(
    params => {
      setLoading(true);
      const data = Object.assign({ type, status: "ADDED", size: 6 }, params);
      getByPage(data)
        .then(res => {
          setData(res.data.content);
          setLoading(false);
          if (res.data.last) {
            setLast(true);
          }
        })
        .catch(() => {
          setLoading(false);
        });
    },
    [type]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleChange = () => {
    form.validateFields((err, values) => {
      if (!err) {
        setLast(false);
        loadData(values);
      }
    });
  };

  const handleSearch = params => {
    if (search === null || search === "") {
      handleChange();
    } else {
      setLoading(true);
      setLast(false);
      const data = Object.assign({ type, size: 6 }, params);
      getByName(search, data)
        .then(res => {
          setData(res.data.content);
          form.resetFields();
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  const handleMore = () => {
    setLoading(true);
    form.validateFields((err, values) => {
      if (!last) {
        const params = Object.assign(
          { type, status: "ADDED", size: 6, page: page + 1 },
          values
        );
        getByPage(params)
          .then(res => {
            setData([...data, ...res.data.content]);
            setLoading(false);
            if (!res.data.last) {
              setPage(page + 1);
            } else {
              setLast(true);
            }
          })
          .catch(() => {
            setLoading(false);
          });
      }
    });
  };

  const loadMore = (
    <Button block loading={loading} disabled={last} onClick={handleMore}>
      加载更多
    </Button>
  );

  return (
    <div className="list">
      <Divider children={HouseListText[type]} />
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <Input.Search
          placeholder="输入地区、地铁、小区名进行搜索"
          className="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onSearch={handleSearch}
        />
      </div>
      <div className="search-list">
        <div className="title">
          <span>综合找房</span>
        </div>
        <Form
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 22 }}
          onChange={handleChange}
        >
          <Form.Item label="类型">
            {getFieldDecorator("ownerType")(
              <Radio.Group disabled={type === "SELL"}>
                <Radio value="">不限</Radio>
                <Radio value="ALL">整租</Radio>
                <Radio value="PART">合租</Radio>
                <Radio value="APART">公寓</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="付款方式">
            {getFieldDecorator("priceType")(
              <Radio.Group disabled={type === "SELL"}>
                <Radio value="">不限</Radio>
                <Radio value="MONTH">月付</Radio>
                <Radio value="QUARTER">季付</Radio>
                <Radio value="HALF">半年付</Radio>
                <Radio value="YEAR">年付</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="户型">
            {getFieldDecorator("plan")(
              <Radio.Group>
                <Radio value="">不限</Radio>
                <Radio value={1}>一居室</Radio>
                <Radio value={2}>两居室</Radio>
                <Radio value={3}>三居室</Radio>
                <Radio value={4}>四居室</Radio>
                <Radio value={5}>五居室及以上</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <hr color="#eee" />
          <Form.Item label="排序">
            {getFieldDecorator("sort")(
              <Radio.Group>
                <Radio.Button value="id,desc">综合</Radio.Button>
                <Radio.Button value="price,asc">价格↑</Radio.Button>
                <Radio.Button value="area,desc">面积↓</Radio.Button>
              </Radio.Group>
            )}
          </Form.Item>
        </Form>
      </div>

      <div className="content-list">
        <List
          loading={loading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={data}
          renderItem={item => <DetailsCard data={item} />}
        />
      </div>
    </div>
  );
});
