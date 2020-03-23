import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  Icon,
  Row,
  Col,
  InputNumber,
  Select,
  Radio,
  message
} from "antd";
import moment from "moment";
import { useUser } from "../../../store/index";
import { upload } from "../../../service/FileApi";
import { areas } from "./area.jsx.js";
import { create, getById, update } from "../../../service/HouseApi";
import "./index.less";

const HouseType = {
  RENT: "出租房",
  SELL: "二手房"
};

export default Form.create()(({ form, match }) => {
  const [goods, setGoods] = useState({});
  const [cover, setCover] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [city, setCity] = useState([]);
  const { getFieldDecorator } = form;
  const { user } = useUser().state;
  const { type, id } = match.params;

  useEffect(() => {
    if (id !== "0") {
      getById(id).then(res => {
        const goods = res.data;
        setGoods(goods);
        setCover([
          {
            uid: 0,
            name: "image.jpg",
            status: "done",
            url: goods.cover
          }
        ]);
        setPictures(
          goods.pictures.split(",").map(v => {
            return {
              uid: v,
              name: "image.jpg",
              status: "done",
              url: v
            };
          })
        );
      });
    }
  }, [id]);

  const chooseCity = e => {
    console.log(e);

    setCity(areas.find(v => v.province === e).citys);
  };

  const handleSubmit = () => {
    form.validateFields((err, values) => {
      if (!err) {
        if (cover.length <= 0 || pictures.length <= 0) {
          message.error("请先上传图片");
        } else {
          const _cover = cover[0].url;
          const _pictures = pictures.map(v => v.url);
          const data = Object.assign(
            {
              type,
              cover: _cover,
              pictures: String(_pictures),
              likeCount: 0,
              userId: user.id,
              userNickname: user.nickname,
              userProfile: user.avatar,
              userPhone: user.phone,
              status: "CREATED",
              createTime: moment()
            },
            values
          );
          if (id !== "0") {
            update(id, data)
              .then(() => {
                message.success("修改成功");
                setTimeout(() => {
                  window.location.href = "/?#/f/me";
                }, 2000);
              })
              .catch(() => {
                message.error("修改失败");
              });
          } else {
            create(data)
              .then(() => {
                message.success("发布成功，已提交至管理员审核...");
                setTimeout(() => {
                  window.location.href = "/#/f/me";
                }, 2000);
              })
              .catch(() => {
                message.error("发布失败");
              });
          }
        }
      }
    });
  };

  const customRequest = opt => {
    upload(opt.file)
      .then(res => {
        const files = [];
        files.push({
          uid: files.length + 1,
          name: "image.jpg",
          status: "done",
          url: res.data
        });
        setCover(files);
      })
      .catch(() => {
        message.error("上传失败");
      });
  };

  const customRequest2 = opt => {
    upload(opt.file)
      .then(res => {
        const files = [...pictures];
        files.push({
          uid: files.length + 1,
          name: "image.jpg",
          status: "done",
          url: res.data
        });
        setPictures(files);
      })
      .catch(() => {
        message.error("上传失败");
      });
  };

  return (
    <div className="publish">
      <div className="content">
        <h2>
          {id === "0" ? "发布" : "编辑"}
          {HouseType[type]}信息
        </h2>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onSubmit={handleSubmit}
        >
          {getFieldDecorator("type", {
            initialValue: type
          })(<React.Fragment />)}
          <Form.Item label="标题">
            {getFieldDecorator("name", {
              initialValue: goods.name,
              rules: [{ required: true, message: "标题不能为空" }]
            })(<Input placeholder="请输入标题" />)}
          </Form.Item>
          <Form.Item label="关键词">
            {getFieldDecorator("keys", {
              initialValue: goods.keys,
              rules: [{ required: true, message: "关键词不能为空" }]
            })(<Input placeholder="请输入关键词" />)}
          </Form.Item>
          <Form.Item label="封面">
            <Upload
              name="cover"
              listType="picture-card"
              accept=".png,.jpg,.jpeg,.gif"
              fileList={cover}
              customRequest={customRequest}
            >
              <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item label="详情图">
            <Upload
              name="pictures"
              listType="picture-card"
              fileList={pictures}
              customRequest={customRequest2}
              accept=".png,.jpg,.jpeg,.gif"
            >
              <div>
                {pictures.length <= 8 && (
                  <>
                    <Icon type="plus" />
                    <div className="ant-upload-text">上传</div>
                  </>
                )}
              </div>
            </Upload>
          </Form.Item>
          <Form.Item label="省市区">
            <Row>
              <Col span={8}>
                <Form.Item>
                  {getFieldDecorator("province", {
                    initialValue: goods.province,
                    rules: [{ required: true, message: "关键词不能为空" }]
                  })(
                    <Select onChange={chooseCity}>
                      {areas.map((v, i) => (
                        <Select.Option key={i} value={v.province}>
                          {v.province}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item>
                  {getFieldDecorator("city", {
                    initialValue: goods.city,
                    rules: [{ required: true, message: "关键词不能为空" }]
                  })(
                    <Select>
                      {city.map((v, i) => (
                        <Select.Option key={i} value={v}>{v}</Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="详细地址">
            {getFieldDecorator("address", {
              initialValue: goods.address,
              rules: [{ required: true, message: "关键词不能为空" }]
            })(<Input placeholder="请输入详细地址" />)}
          </Form.Item>
          <Form.Item label="小区名称">
            {getFieldDecorator("estate", {
              initialValue: goods.estate,
              rules: [{ required: true, message: "小区名称不能为空" }]
            })(<Input placeholder="请输入小区名称" />)}
          </Form.Item>
          {type === "SELL" ? (
            <Form.Item label="价格">
              {getFieldDecorator("price", {
                initialValue: goods.price,
                rules: [{ required: true, message: "价格不能为空" }]
              })(
                <InputNumber
                  style={{ width: "100%" }}
                  max={9999999}
                  placeholder="请输入房屋价格"
                />
              )}
            </Form.Item>
          ) : (
            <Form.Item label="价格/付款方式">
              <Row>
                <Col span={8}>
                  <Form.Item>
                    {getFieldDecorator("price", {
                      initialValue: goods.price,
                      rules: [{ required: true, message: "价格不能为空" }]
                    })(
                      <InputNumber
                        style={{ width: "100%" }}
                        max={9999999}
                        placeholder="请输入单月价格"
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item>
                    {getFieldDecorator("priceType", {
                      initialValue: goods.priceType || "MONTH",
                      rules: [{ required: true, message: "付款方式不能为空" }]
                    })(
                      <Select>
                        <Select.Option value="MONTH">月付</Select.Option>
                        <Select.Option value="QUARTER">季付</Select.Option>
                        <Select.Option value="HALF">半年付</Select.Option>
                        <Select.Option value="YEAR">年付</Select.Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form.Item>
          )}
          <Form.Item label="面积/类型">
            <Row>
              <Col span={6}>
                <Form.Item>
                  {getFieldDecorator("area", {
                    initialValue: goods.area || 20,
                    rules: [{ required: true, message: "房屋面积不能为空" }]
                  })(
                    <InputNumber
                      style={{ width: "100%" }}
                      placeholder="请输入房屋面积"
                      formatter={value => `${value} 平米`}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  {getFieldDecorator("ownerType", {
                    initialValue: goods.ownerType || "ALL",
                    rules: [{ required: true, message: "关键词不能为空" }]
                  })(
                    <Select>
                      <Select.Option value="ALL">整租</Select.Option>
                      <Select.Option value="PART">合租</Select.Option>
                      <Select.Option value="APART">公寓</Select.Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="楼层/总楼层">
            <Row>
              <Col span={6}>
                <Form.Item>
                  {getFieldDecorator("floor", {
                    initialValue: goods.floor || 1,
                    rules: [{ required: true, message: "楼层不能为空" }]
                  })(
                    <InputNumber
                      style={{ width: "100%" }}
                      placeholder="请输入楼层"
                      formatter={value => `第 ${value} 层`}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  {getFieldDecorator("floors", {
                    initialValue: goods.floors || 18,
                    rules: [{ required: true, message: "总楼层不能为空" }]
                  })(
                    <InputNumber
                      style={{ width: "100%" }}
                      placeholder="请输入总楼层"
                      formatter={value => `共有 ${value} 层`}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="户型">
            {getFieldDecorator("plan", {
              initialValue: goods.plan || 1
            })(
              <Radio.Group>
                <Radio value={1}>一居室</Radio>
                <Radio value={2}>二居室</Radio>
                <Radio value={3}>三居室</Radio>
                <Radio value={4}>四居室</Radio>
                <Radio value={5}>五居及以上</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="水电网费">
            <Row>
              <Col span={6}>
                <Form.Item>
                  {getFieldDecorator("water", {
                    initialValue: goods.water || 6,
                    rules: [{ required: true, message: "水费不能为空" }]
                  })(
                    <InputNumber
                      style={{ width: "100%" }}
                      placeholder="请输入水费"
                      formatter={value => `水费 ${value} 元/吨`}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  {getFieldDecorator("electric", {
                    initialValue: goods.electric || 1,
                    rules: [{ required: true, message: "电费不能为空" }]
                  })(
                    <InputNumber
                      style={{ width: "100%" }}
                      placeholder="请输入电费"
                      formatter={value => `电费 ${value} 元/度`}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  {getFieldDecorator("gmfs", {
                    initialValue: goods.gmfs || 50,
                    rules: [{ required: true, message: "网费不能为空" }]
                  })(
                    <InputNumber
                      style={{ width: "100%" }}
                      placeholder="请输入网费"
                      formatter={value => `网费 ${value} 元/月`}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            style={{ margin: "30px 0 10px 0" }}
          >
            确认{id === "0" ? "发布" : "修改"}
          </Button>
        </Form>
      </div>
    </div>
  );
});
