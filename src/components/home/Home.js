import React, {useState, useEffect} from 'react';
import { ScrollParallax } from "react-just-parallax";
import "swiper/swiper.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import LoadingModal from "../loadingModal/LoadingModal"
import SelectNftBoxModal from "./selectNftBox/SelectNftBoxModal";
import VisualBackground from "../../assets/images/home/back.png";
import VisualCard01 from "../../assets/images/home/card_01.png";
import VisualCard02 from "../../assets/images/home/card_02.png";
import VisualCard03 from "../../assets/images/home/card_03.png";
import VisualTitleBadge from "../../assets/images/home/title_badge.png";
import ContentBackground from "../../assets/images/home/back_mid_01.png";
import styles from "./Home.module.scss";
import {Modal} from "react-bootstrap";

export default function Home(props) {
    const [showLoading, setShowLoading] = useState(false); // 로딩 모달
    const [selectBox, setSelectBox] = useState(false); // 셀렉트 박스

    const [showAlertModal, setShowAlertModal] = useState(false); // 알림창 모달
    const [alerts, setAlerts] = useState(""); // 알림 메세지
    const [item, setItem] = useState(null); // 알림 메세지
    function closeAlert() {
        setShowAlertModal(false);
        setAlerts("");
    }

    // 지갑연결 확인
    function walletCheck() {
        if (props.accounts === '') {
            setAlerts("Please connect wallet.");
            setShowAlertModal(true);
            return false;
        }
        return true;
    }
    // nft 리스트 출력
    function nftListOpen(item) {
        if(!props.raffleInfo.used){
            setAlerts("래플 가능한 시간이 아닙니다.");
            setShowAlertModal(true);
            return false;
        }
        if (!walletCheck()) {
            return false;
        }
        setItem(item);
        setSelectBox(true);
    }
    function YYYYMMDDHIS(orgDate){
        let date = new Date(orgDate);
        let year = date.getFullYear();
        let month = ('0' + (date.getMonth() + 1)).slice(-2);
        let day = ('0' + date.getDate()).slice(-2);
        let hours = ('0' + date.getHours()).slice(-2);
        let minutes = ('0' + date.getMinutes()).slice(-2);
        let seconds = ('0' + date.getSeconds()).slice(-2);
        let dateString = year + '-' + month  + '-' + day;
        let timeString = hours + ':' + minutes  + ':' + seconds;
        return dateString + ' ' + timeString;
    }
    useEffect(() => {
        AOS.init({
            duration: 1000
        });
    });
    return (
        <div>
            <section className={styles.visual_section}>
                <img className={styles.background_img} src={VisualBackground} alt="Visual Background"/>
                <ScrollParallax strength={0.2} lerpEase={0.06} isAbsolutelyPositioned={true} zIndex={2} shouldPause={true}>
                    <img data-aos="fade-up-left" className={`${styles.visual_card} ${styles.card_01}`} src={VisualCard01} alt="Visual Background"/>
                </ScrollParallax>
                <ScrollParallax strength={0.15} lerpEase={0.12} isAbsolutelyPositioned={true} zIndex={2} shouldPause={true}>
                    <img data-aos="zoom-in-right" data-aos-offset="600" className={`${styles.visual_card} ${styles.card_02}`} src={VisualCard02} alt="Visual Background"/>
                </ScrollParallax>
                <ScrollParallax strength={0.07} lerpEase={0.08} isAbsolutelyPositioned={true} zIndex={2} shouldPause={true}>
                    <img data-aos="zoom-in-left" data-aos-offset="500"  className={`${styles.visual_card} ${styles.card_03}`} src={VisualCard03} alt="Visual Background"/>
                </ScrollParallax>
                <div className={styles.visual_box}>
                    <h1 className={styles.visual_box_title}>
                       LARVA NFT<br/>
                       <span>RAFFLE EVENT</span>
                        <div className={styles.visual_box_title_img}>
                            <img src={VisualTitleBadge} alt={"badge img"}/>
                            <span>{props.raffleInfo.round}회차</span>
                        </div>
                    </h1>
                    <p className={styles.visual_box_text}>
                        {props.raffleInfo.title}<br/>
                        {props.raffleInfo.description}
                    </p>
                    <div className={styles.visual_box_date}>
                        <div>
                            <div>기간</div>
                            <div>{YYYYMMDDHIS(props.raffleInfo.start_date)}<br/> ~ {YYYYMMDDHIS(props.raffleInfo.end_date)}</div>
                        </div>
                        <div>
                            <div>발표</div>
                            <div>{YYYYMMDDHIS(props.raffleInfo.announcement_date)}</div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.content_section}>
                <h2 className={styles.content_title}>LARVA NFT RAFFLE</h2>
                <div className={styles.content_background}>
                    <img src={ContentBackground} alt={"content background img"}/>
                    <div className={styles.content_box}>
                        {
                            props.raffleList.map((item, index) => (
                                <div key={index} className={styles.raffle_item} data-aos="flip-right">
                                    <div className={styles.raffle_item_info}>
                                        <img src={item.image_url} alt={`${item.title} img`} />
                                        <h6>{item.title}</h6>
                                        <div>
                                            <label>가격</label>
                                            <p>{parseInt(item.price).toLocaleString('ko-KR')}<span>KANV</span></p>
                                        </div>
                                        <div>
                                            <label>응모현황</label>
                                            <p>{item.enter}<span>개</span></p>
                                        </div>
                                    </div>
                                    <button onClick={() => nftListOpen(item)} className={styles.raffle_btn}>응모하기</button>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

            {/*알림창 모달*/}
            <Modal centered show={showAlertModal}
                   onHide={() => closeAlert()}>
                <Modal.Body>
                    <div className="text-center mt-5">
                        <p className="alert_msg"> {alerts}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer className="alert_box">
                    <button variant="" onClick={() => closeAlert()} className="close_btn">
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
            <LoadingModal showLoading={showLoading} setShowLoading={setShowLoading}/>
            {selectBox &&
                <SelectNftBoxModal selectBox={selectBox} setSelectBox={setSelectBox} setAlerts={setAlerts} setShowAlertModal={setShowAlertModal}
                                   userAddress={props.accounts} networkId={props.networkId} apiToken={props.apiToken}
                                   setShowLoading={setShowLoading} raffleInfo={props.raffleInfo} item={item}/>
            }
        </div>
    );
}
