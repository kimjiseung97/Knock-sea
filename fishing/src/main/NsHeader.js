import React from 'react'
import RvTemplate from './reservation/RvTemplate'
import './scss/NsHeader.scss'
import logoPath from './img/logo.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLoginUserInfo , isLogin } from './util/login-util';
import { useEffect ,useHistory} from 'react'


export const NsHeader = () => {
  const navi = useNavigate();

  const linkStyle = {
    color: 'black',
    textDecoration: 'none'
  };

  //프로필이미지 url 상태변수
  const [profileUrl,setProfileUrl] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(isLogin()); 

  const [userInfo, setUserInfo] = useState({
    token: '', // Set default value for name
    userEmail: '', // Set default value for email
    userName : '',
    userGrade : '',
    userId : '',
    userPhone : ''
  });

  const resetStorage = (e) =>{
    e.preventDefault();
    const confirm =window.confirm('정말 로그아웃하시겠어요?');
    if(confirm){
      setIsLoggedIn(isLogin());
      localStorage.clear();
      navi('/');
    }else{
      return false; // Add this line to prevent further actions
    }
  }

  // 로그인 상태 변화를 감지하는 useEffect를 추가
  useEffect(() => {
    const user = getLoginUserInfo();
    setUserInfo(user);
    setIsLoggedIn(!isLogin());
    }, [isLogin()]);

    useEffect(() => {
    
      isLoggedIn &&
      (async() => {
          const res = await fetch('http://localhost:8012/api/v1/user/load-s3', {
              method: 'GET',
              headers: { 'Authorization': 'Bearer ' + getLoginUserInfo().token }
          });
      
          if (res.status === 200) {
              // 서버에서 s3 url이 응답된다
              const imgUrl = await res.text();                  
              setProfileUrl(imgUrl);
  
              
              // //서버에서 직렬화된 이미지가 응답된다.
              // const profileBlob = await res.blob();
              //  //해당 이미지를 imgUrl로 변경
              // const imgUrl = window.URL.createObjectURL(profileBlob);
              // setProfileUrl(imgUrl);
              
          } else {
              const err = await res.text();
              setProfileUrl(null);
          }
        })();
      }, [isLoggedIn]);
    

  return (
    <header>
      <div className='header1'>
        <div className='hdleft'>
          <Link to={'/'}><img src={logoPath}/></Link>
            <ul>
                <li><Link to={'/bt'} style={linkStyle} className='hdleft-tap'> 배낚시</Link></li>
                <li><Link to={'/fs'}  style={linkStyle} className='hdleft-tap'> 낚시터</Link></li>
                <li><Link to={'/class'}  style={linkStyle} className='hdleft-tap'> 클래스</Link></li>
                {userInfo.Grade === 'ADMIN' &&(<li><Link to={'/admin'}>관리자</Link></li>)}
                {userInfo.token &&(<li><Link to={'/my'}>마이페이지</Link></li>)}
            </ul>
        </div>
   
        <div className='hdright'>
          {isLogin() ?(
            <>
                {userInfo.Grade !== 'OWNER' && userInfo.token && (<div><Link to={'/ownercheck'} style={linkStyle}>사장님 등록</Link></div>)}
              {/* {console.log(profileUrl)} */}
              <span>{userInfo.userName}님</span>
              <Link to={{ pathname: '/my', state: userInfo }} style={linkStyle} profileUrl>
                <img className="my-profile" title="마이페이지" src={profileUrl || require('./icons/01d.png')} />
              </Link>

            </>
            ):
            (
              <>

              </>
            )
          }
           {/* <Link to={'/my'} style={linkStyle}><img className="my-profile" title='마이페이지'
            src={profileUrl || require('./icons/01d.png')}/></Link> */}
          <div className='userLogin'>
          {isLogin() ?(
            <Link to={'/login'}  style={linkStyle} onClick={resetStorage}>Log-out</Link>
            )
            :(
              <><Link to={'/login'}  style={linkStyle}>Log-in</Link></>
            )
          }
          </div>
        </div>
      </div>
   
    </header>

  )
}
