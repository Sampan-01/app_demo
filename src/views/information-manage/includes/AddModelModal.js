import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import {
  Row,
  Form,
  Col,
  Input,
  Upload,
  Icon,
  Modal,
  Button,
  Select,
  InputNumber
} from 'antd'
import { BaseModal } from '@/components/common'
import { modelRule } from './FormRule'
import { fetchVehicleAdd } from '@/api/info'
import { ValidSelect } from '@/utils/CommonSelect'
import { getAuditSelectAll } from '@/utils/config'

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

class AddModelModal extends Component {
  static propTypes = {
    form: PropTypes.object,
    modelModal: PropTypes.bool,
    modelTitle: PropTypes.string,
    handelModal: PropTypes.func,
    hideCancelModal: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      auditList: [],
      modelInfo: {
        id: '',
        bid: '',
        aid: '',
        vTypeEname: '',
        vTypeCname: '',
        vType: '',
        vSource: '',
        vAbbreviation: '',
        vAnnual: '',
        vAppImage: '',
        vState: 1,
        sortNum: ''
      }
    }
  }
  componentDidMount () {
    getAuditSelectAll().then(res => {
      this.setState({
        auditList: res
      })
    })
  }
  handelModal = e => {
    this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
      if (!err) {
        const { code } = await fetchVehicleAdd(fieldsValue)
        if (code) {
          this.props.handelModal(e)
        }
      }
    })
  };
  hideCancelModal = () => {
    this.props.hideCancelModal()
  };

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    })
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render () {
    const { getFieldDecorator } = this.props.form
    const { fileList, modelInfo, auditList } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div>
        <BaseModal
          ModalTitle={ this.props.modelTitle }
          ModalVisible={ this.props.modelModal }
          hideSuccessModal={ () => this.handelModal(true) }
          hideModal={ () => this.hideCancelModal() }
        >
          <Form layout={ 'vertical' }>
            <Row gutter={ 20 }>
              <Col span={ 8 }>
                <Form.Item label="品牌">
                  {getFieldDecorator('bid', {
                    initialValue: modelInfo.bid,
                    ...modelRule.bid
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={ 8 }>
                <Form.Item label="车系">
                  {getFieldDecorator('aid', {
                    initialValue: modelInfo.aid,
                    ...modelRule.aid
                  })(
                    <Select defaultValue="all">
                      {Object.values(auditList).map(item => (
                        <Option label={ item.cname } value={ item.id }>
                          {item.cname}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={ 8 }>
                <Form.Item label="车型（英文）">
                  {getFieldDecorator('vTypeEname', {
                    initialValue: modelInfo.vTypeEname,
                    ...modelRule.vTypeEname
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={ 8 }>
                <Form.Item label="车型（中文）">
                  {getFieldDecorator('vTypeCname', {
                    initialValue: modelInfo.vTypeCname,
                    ...modelRule.vTypeCname
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={ 8 }>
                <Form.Item label="车型类型">
                  {getFieldDecorator('vType', {
                    initialValue: modelInfo.vType,
                    ...modelRule.vType
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={ 8 }>
                <Form.Item label="车原地">
                  {getFieldDecorator('vSource', {
                    initialValue: modelInfo.vSource,
                    ...modelRule.vSource
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={ 8 }>
                <Form.Item label="简称">
                  {getFieldDecorator('vAbbreviation', {
                    initialValue: modelInfo.vAbbreviation,
                    ...modelRule.vAbbreviation
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={ 8 }>
                <Form.Item label="年款">
                  {getFieldDecorator('vAnnual', {
                    initialValue: modelInfo.vAnnual,
                    ...modelRule.vAnnual
                  })(<Input />)}
                </Form.Item>
              </Col>

              <Col span={ 8 }>
                <Form.Item label="排序编号">
                  {getFieldDecorator('sortNum', {
                    initialValue: modelInfo.sortNum,
                    ...modelRule.sortNum
                  })(<InputNumber style={ { width: '100%' } } min={ 0 } />)}
                </Form.Item>
              </Col>
              <Col span={ 8 }>
                <Form.Item label="状态">
                  {getFieldDecorator('vState', {
                    initialValue: modelInfo.vState,
                    ...modelRule.vState
                  })(
                    <Select>
                      {Object.values(ValidSelect).map(item => (
                        <Option { ...item } key={ item.value }>
                          {item.label}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={ 8 }>
                <Form.Item label="APP图片（大图）">
                  {getFieldDecorator('vAppImage', {
                    ...modelRule.vAppImage
                  })(
                    <Input />
                    // <Upload
                    //   action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    //   listType="picture-card"
                    //   fileList={ fileList }
                    //   onPreview={ this.handlePreview }
                    //   onChange={ this.handleChange }
                    // >
                    //   {fileList.length >= 8 ? null : uploadButton}
                    // </Upload>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </BaseModal>
      </div>
    )
  }
}

export default Form.create({})(AddModelModal)
