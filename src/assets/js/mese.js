export default{
    vw_none() {
        return  `
                <div class="vw_none">
                    <div class="w_pui_none_value" style="padding-top: 30px; padding-bottom: 100px; color: rgb(204, 204, 204);">
                        <div class="cc_box">
                            <i class="iconfont el-icon-document"></i> 
                            <div class="cc_box_content">
                                <bdo class="cc_box_title">暂无相关内容</bdo>
                            </div>
                        </div>
                    </div>
                </div>`
    },
    vw_system_list() {
        return `
                <div class="vw_system_list"  onclick="letterPart()">
                    <div class="vw_letter_part">
                        <div class="w_pui_sms_briefing">
                            <div class="cc_wrap">
                                <div class="cc_icon">
                                    <div class="w_default_avatar">
                                        <span class="avatar-wrapper size-64" style="background-image: url(&quot;static/image/29542573.jpg&quot;);"></span>  
                                    </div> 
                                    <i class="cc_unread">5</i>
                                </div>
                                <div class="cc_msg">
                                    <span class="cc_msg_header">
                                        <a href="#">POCO小助手</a> 
                                        <bdo>2020-10-19 12:00</bdo>
                                    </span> 
                                    <span class="cc_msg_content">
                                        <div class="w_pui_faceicon_bypoco">
                                            <div class="cc_content">金浩森，归来仍是少年！</div>
                                        </div>
                                    </span>
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>`
    },
    w_poco_sms_detail() {
        return ` 
                <div class="w_poco_sms_detail">
                    <div class="cc_detail">
                        <div class="w_pui_sms_detail" style="height: 500px;">
                            <div class="cc_header">
                                <a href="javascript:void(0)" class="cc_back">
                                    <i class="el-icon-arrow-left"></i> 
                                    <bdo>私信列表</bdo>
                                </a> 
                                <h2>POCO小助手</h2>
                            </div>
                            <div class="infinite-list-wrapper" style="overflow:auto; height:410px;">
                                <ul
                                    class="list"
                                    v-infinite-scroll="load"
                                    infinite-scroll-disabled="disabled">
                                    <li v-for="(i,index) in count" :key="index" class="list-item">
                                        <div class="cc_part cc_part_left">
                                            <span class="cc_part_time">2019-05-16 15:08</span>
                                            <div class="cc_part_msg_box">
                                                <a href="javascript:void(0)" class="ccc_icon">
                                                    <img src="static/image/29542573.jpg"/>
                                                </a>
                                                <div class="cc_part_msg">
                                                    <i class="cc_arrow_label"></i>
                                                    <div class="cc_part_content cc_part_content_text">
                                                        <div class="cc_text">
                                                            <div class="w_pui_faceicon_bypoco">
                                                                <div class="cc_content">
                                                                    【系统通知】根据网络实名制相关规定，即日起，所有账号均需绑定手机号码，否则将影响作品发布及评论等操作。如遇到作品发布失败提示，请先进入设置页检查是否已绑定手机号码。
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <p v-if="loading" class="cc_part_time">加载中<i class="el-icon-loading"></i></p>
                                <p v-if="noMore" class="cc_part_time">没有更多了</p>
                            </div>
                        </div>
                    </div>
                </div>`
    }
    
}