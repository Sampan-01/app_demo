import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Input, Select, Tree } from 'antd'
import { BaseModal } from '@/components/common'
import { ruleSetRule } from './FromRule'
import { fetchUserAdd } from '@/api/system'
const { Option } = Select
const { TreeNode } = Tree

class AddRuleSetModal extends PureComponent {
  static propTypes = {
    form: PropTypes.object,
    ruleSetModal: PropTypes.bool,
    adminTitle: PropTypes.string,
    handelSuccessModal: PropTypes.func,
    hideCancelModal: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      ruleSetInfo: {
        name: '',
        state: '',
        rule: []
      }
    }
  }
  handelSuccess = e => {
    this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
      if (!err) {
        const { code } = await fetchUserAdd(fieldsValue)
        if (code) {
          this.props.handelSuccessModal(e)
        }
      }
    })
  };
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
  };

  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info)
  };
  render () {
    const { getFieldDecorator } = this.props.form
    const { ruleSetInfo } = this.state
    return (
      <BaseModal
        ModalTitle="添加权限"
        ModalVisible={ this.props.ruleSetModal }
        hideSuccessModal={ () => this.handelSuccess(true) }
        hideModal={ () => this.props.hideCancelModal() }
      >
        <Form layout={ 'vertical' }>
          <Row gutter={ 20 }>
            <Col span={ 12 }>
              <Form.Item label="权限名称">
                {getFieldDecorator('account', {
                  initialValue: ruleSetInfo.name,
                  ...ruleSetRule.name
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 12 }>
              <Form.Item label="状态">
                {getFieldDecorator('state', {
                  initialValue: ruleSetInfo.state,
                  ...ruleSetRule.state
                })(
                  <Select>
                    <Option value={ 0 }>开启</Option>
                    <Option value={ 1 }>禁用</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 24 }>
              <Form.Item label="权限树">
                {getFieldDecorator('treeId', { initialValue: '' })(
                  <Tree
                    checkable
                    defaultExpandedKeys={ [ '0-0-0', '0-0-1' ] }
                    defaultSelectedKeys={ [ '0-0-0', '0-0-1' ] }
                    defaultCheckedKeys={ [ '0-0-0', '0-0-1' ] }
                    onSelect={ this.onSelect }
                    onCheck={ this.onCheck }
                  >
                    <TreeNode title="parent 1" key="0-0">
                      <TreeNode title="parent 1-0" key="0-0-0" disabled>
                        <TreeNode title="leaf" key="0-0-0-0" disableCheckbox />
                        <TreeNode title="leaf" key="0-0-0-1" />
                      </TreeNode>
                      <TreeNode title="parent 1-1" key="0-0-1">
                        <TreeNode title="sd" key="0-0-1-0" />
                      </TreeNode>
                    </TreeNode>
                  </Tree>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </BaseModal>
    )
  }
}
export default Form.create({})(AddRuleSetModal)
