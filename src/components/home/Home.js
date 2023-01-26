import React, {useState, useEffect,useRef} from 'react';
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
// import VisualCharacter from "../../assets/images/home/home_visual_character.png";
import ContentBackground from "../../assets/images/home/back_mid_01.png";
import ReffleItem01 from "../../assets/images/home/reffle_item_01.png";
import styles from "./Home.module.scss";
import {Modal} from "react-bootstrap";
import {POST, GET} from "../../api/api";

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
        if (!walletCheck()) {
            return false;
        }
        setItem(item);
        setSelectBox(true);
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
                            <img src={VisualTitleBadge}/>
                            <span>{props.raffleInfo.round}회차</span>
                        </div>
                    </h1>
                    <p className={styles.visual_box_text}>
                        래플 소개 텍스트 입니다.래플 소개 텍스트 입니다.
                        래플 소개 텍스트 입니다.래플 소개 텍스트 입니다.
                        래플 소개 텍스트 입니다.래플 소개 텍스트 입니다.
                        래플 소개 텍스트 입니다.래플 소개 텍스트 입니다.
                    </p>
                    <div className={styles.visual_box_date}>
                        <div>
                            <div>기간</div>
                            <div>{props.raffleInfo.start_date}<br/>~ {props.raffleInfo.end_date}</div>
                        </div>
                        <div>
                            <div>발표</div>
                            <div>{props.raffleInfo.announcement_date}</div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.content_section}>
                <h2 className={styles.content_title}>LARVA NFT RAFFLE</h2>
                <div className={styles.content_background}>
                    <img src={ContentBackground} />
                    <div className={styles.content_box}>
                        {
                            props.raffleList.map((item, index) => (
                                <div key={index} className={styles.raffle_item} data-aos="flip-right">
                                    <div className={styles.raffle_item_info}>
                                        <img src={item.image_url} />
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
