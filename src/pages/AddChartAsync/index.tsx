import { genChartByAiAsyncUsingPOST } from '@/services/bi/chartController';
import { UploadOutlined } from '@ant-design/icons';
import {Button, Card, Col, Divider, Form, Input, message, Row, Select, Space, Spin, Upload,Table,notification} from 'antd';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect,useState,useRef } from 'react';
import * as XLSX from 'xlsx';

const baseURL='http://localhost:8080';

/**
 * 添加图表页面(异步)
 * @constructor
 */
//const { TextArea } = Input;
const AddChartAsync: React.FC = () => {
  const [form] = useForm();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [fileData, setFileData] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  //const [pollingId, setPollingId] = useState<NodeJS.Timeout | null>(null);
  //const pollingIdRef = useRef<NodeJS.Timeout | null>(null);
  const pollCountRef = useRef<number>(0);

  // useEffect(() => {
  //   // 组件卸载时清除定时器
  //   return () => {
  //     if (pollingIdRef.current) {
  //       clearInterval(pollingIdRef.current);
  //       pollingIdRef.current = null;
  //     }
  //   };
  // }, []);
  
  /**
   * 提交
   * @param values
   */
  const onFinish = async (values: any) => {
    // 避免重复提交
    if (submitting) {
      return;
    }
    setSubmitting(true);
    // 对接后端，上传数据
    const params = {
      ...values,
      file: undefined,
    };
    try {
      const res = await genChartByAiAsyncUsingPOST(params, {}, values.file.file.originFileObj);
      if (!res?.data) {
        message.error('分析失败');
      } else {
        message.success('分析任务已提交，请在图表管理中查看');
        form.resetFields();
        const chartId=res.data.chartId;
        const id = setInterval(() => checkTask(chartId,id), 6000); // 每 5 秒轮询一次
        //setPollingId(id);
      }
    } catch (e: any) {
      message.error('分析失败，' + e.message);
      console.log('分析失败，' + e.message);
    }
    setSubmitting(false);
  };

  const checkTask = async (chartId: number,intervalId:number) => {
    // 设置最大轮询次数
    const maxPollCount = 20;
    let name = '';
    const pollFunction = async () => {
      try {
        // 发送请求检查任务状态，带上 chartId
        const response = await fetch(baseURL + `/api/chart/gen/check?chartId=${chartId}`);
        const result = await response.json();
        name = result.data.name;
        // 如果任务完成，弹出通知
        if (result.data.status === 'succeed') {
          notification.success({ message: name + '--分析完成，请至图标管理查看' });
          clearInterval(intervalId);
          //pollingIdRef.current = null;
          pollCountRef.current=0;
        } else {
          // 如果未完成但已达到最大轮询次数，弹出通知
          if (pollCountRef.current >= maxPollCount) {
            notification.warning({ message: name + '--分析超时，请重试' });
            clearInterval(intervalId);
            pollCountRef.current=0;
          } else {
            // 设置新的定时器，每 5 秒执行一次轮询
            //setTimeout(pollFunction, 5000);
          }
        }
        // 增加轮询计数器
        pollCountRef.current++;
      } catch (error) {
        console.error('Error checking task:', error);
        notification.error({ message: name + '--分析出错了，请重试' });
        clearInterval(intervalId);
        pollCountRef.current=0;
      }
    };
    // 初始化时执行一次轮询
    pollFunction();
  };
  

  const handleChange = (info) => {
    if (info.file.status === 'done') {
      setUploadedFile(info.file.response); // 这里假设上传成功后服务端返回文件信息
      // 读取上传的 Excel 文件
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        // 获取第一个工作表的数据
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        setFileData(sheetData);
        console.log(sheetData);
        console.log(fileData);
      };
      reader.readAsBinaryString(info.file.originFileObj);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 文件上传失败.`);
    }
  };

  const columns = fileData.length > 0 ? Object.keys(fileData[0]).map((key) => ({ title: key, dataIndex: key })) : [];


  return (
    <div className="add-chart-async">
      <Row gutter={24}>
        <Col span={12}>
          <Card title="智能分析">
              <Form form={form} name="addChart" labelAlign="left" labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }} onFinish={onFinish} initialValues={{}}>
                <Form.Item
                  name="goal"
                  label="分析目标"
                  rules={[{ required: true, message: '请输入分析目标' }]}
                >
                  <TextArea placeholder="请输入你的分析需求，比如：分析网站用户的增长情况" />
                </Form.Item>
                <Form.Item name="name" label="图表名称">
                  <Input placeholder="请输入图表名称" />
                </Form.Item>
                <Form.Item name="chartType" label="图表类型">
                  <Select
                    options={[
                      { value: '折线图', label: '折线图' },
                      { value: '柱状图', label: '柱状图' },
                      { value: '堆叠图', label: '堆叠图' },
                      { value: '饼图', label: '饼图' },
                      { value: '雷达图', label: '雷达图' },
                    ]}
                  />
                </Form.Item>
                <Form.Item name="file" label="原始数据">
                  <Upload name="file" maxCount={1} accept=".csv,.xls,.xlsx,.json,.txt,.xml,.sql"
                  action="/uploadExcel" onChange={handleChange}>
                    <Button icon={<UploadOutlined />}>上传 CSV 文件</Button>
                  </Upload>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
                  <Space>
                    <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>
                    Just do it
                    </Button>
                    <Button htmlType="reset">重置</Button>
                  </Space>
                </Form.Item>
              </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="数据预览">
            {uploadedFile ? (
              <Table dataSource={fileData} columns={columns} />
            ) : (
              <div>请先在左侧进行提交</div>
            )}
            <Spin spinning={submitting}/>
          </Card>
        </Col>
      </Row>
          
    </div>
  );
};
export default AddChartAsync;
