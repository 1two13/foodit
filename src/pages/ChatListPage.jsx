import React from 'react';
import { useNavigate } from 'react-router-dom';
import TabBar from '../components/common/navBar/TabBar';
import TextBar from '../components/common/navBar/TextBar';
import { Show } from '../components/common/ShowCase';

const ChatListPage = () => {
  const chatData = [
    {
      id: 1,
      photo: '',
      title: '다크 초코씨솔트 프로틴 바 같이 사실 분~?',
      people: 5,
      message: 'TODO님, 근처에서 다양한 물품들이 매일 올',
      timestamp: '오후 12:20',
      unread: 10,
    },
    {
      id: 2,
      photo: '',
      title: '우리마트에서 바나나 같이사요',
      people: 5,
      message: 'TODO님, 근처에서 다양한 물품들이 매일 올',
      timestamp: '오후 12:20',
      unread: 1,
    },
    {
      id: 3,
      photo: '',
      title: '네고왕에서 네고한 냉면 나눠살래요?',
      people: 5,
      message: 'TODO님, 근처에서 다양한 물품들이 매일 올',
      timestamp: '오후 12:20',
      unread: 12,
    },
    {
      id: 4,
      photo: '',
      title: '강아지 사료 대용량 나눕시다!',
      people: 5,
      message: 'TODO님, 근처에서 다양한 물품들이 매일 올',
      timestamp: '오후 12:20',
      unread: 0,
    },
    {
      id: 5,
      photo: '',
      title: '텀블러 2+1이던데... 하나씩 살래요?',
      people: 5,
      message: 'TODO님, 근처에서 다양한 물품들이 매일 올',
      timestamp: '오후 12:20',
      unread: 3,
    },
    {
      id: 6,
      photo: '',
      title: '가평 빠지 성인1+1 같이 가실 분?',
      people: 5,
      message: 'TODO님, 근처에서 다양한 물품들이 매일 올',
      timestamp: '오후 12:20',
      unread: 11,
    },
    {
      id: 7,
      photo: '',
      title: '수박이 너무 커요 반띵하실?',
      people: 5,
      message: 'TODO님, 근처에서 다양한 물품들이 매일 올',
      timestamp: '오후 12:20',
      unread: 0,
    },
    {
      id: 8,
      photo: '',
      title: '같이 코스트코 가서 쉐어할 사람?',
      people: 5,
      message: 'TODO님, 근처에서 다양한 물품들이 매일 올',
      timestamp: '오후 12:20',
      unread: 44,
    },
    {
      id: 9,
      photo: '',
      title: '고추장 매니아가 전합니다.',
      people: 5,
      message: '고추장 1+1인데 나누실래요?',
      timestamp: '오후 12:20',
      unread: 1,
    },
    {
      id: 10,
      photo: '',
      title: '우울할때는 고기앞으로',
      people: 5,
      message: '이마트에서 행사하네요 고기사러',
      timestamp: '오후 12:20',
      unread: 0,
    },
  ];
  const lastChat = chatData[chatData.length - 1]; // 마지막 채팅 데이터 가져오기
  const lastChatTime = new Date(lastChat.timestamp); // 채팅 시간을 Date 객체로 변환
  const formattedTime = lastChatTime.toLocaleTimeString('ko-KR', { hour: 'numeric', minute: 'numeric' }); // 원하는 형식으로 시간 변환

  const navigate = useNavigate();
  const handleOpenChat = () => {
    // navigate('/chat');
    alert('채팅기능 구현 후 업데이트 예정입니다.');
    console.log('채팅기능 구현 후 업데이트 예정입니다.');
  };

  return (
    <div className="flex flex-col max-height">
      <TextBar title={'채팅'} />
      <Show className="w-full flex-1 px-[15px] overflow-scroll">
        {
          <div className="">
            {/* 채팅리스트가 없을 때 */}
            {!chatData && (
              <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                <svg
                  className="m-auto"
                  width="78"
                  height="78"
                  viewBox="0 0 78 78"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.7772 64.6003C9.70112 64.6003 8.66895 64.1737 7.90684 63.414C7.14474 62.6544 6.71487 61.6236 6.71143 60.5475V54.9705L6.72118 21.125C6.72118 18.9701 7.5772 16.9035 9.10093 15.3798C10.6247 13.856 12.6913 13 14.8462 13H63.1802C64.2472 13 65.3037 13.2102 66.2895 13.6185C67.2752 14.0268 68.1709 14.6253 68.9254 15.3798C69.6799 16.1342 70.2784 17.0299 70.6867 18.0157C71.095 19.0015 71.3052 20.058 71.3052 21.125V48.4575C71.3052 49.5245 71.095 50.581 70.6867 51.5668C70.2784 52.5526 69.6799 53.4483 68.9254 54.2027C68.1709 54.9572 67.2752 55.5557 66.2895 55.964C65.3037 56.3723 64.2472 56.5825 63.1802 56.5825H22.4837C21.8437 56.5809 21.2097 56.7061 20.6183 56.951C20.027 57.1959 19.4901 57.5556 19.0387 58.0093L13.6502 63.4075C13.2736 63.7859 12.8258 64.0861 12.3328 64.2908C11.8397 64.4954 11.311 64.6006 10.7772 64.6003ZM14.8462 16.2565C13.5532 16.2565 12.3133 16.7701 11.399 17.6844C10.4848 18.5986 9.97118 19.8386 9.97118 21.1315L9.94518 54.9672V60.5378C9.94553 60.6984 9.99349 60.8553 10.083 60.9887C10.1725 61.1221 10.2995 61.2259 10.448 61.2871C10.5966 61.3484 10.7599 61.3642 10.9174 61.3326C11.0749 61.301 11.2195 61.2235 11.3329 61.1098L16.7409 55.705C17.4932 54.9484 18.3882 54.3485 19.3739 53.9401C20.3597 53.5318 21.4167 53.323 22.4837 53.326H63.1802C64.4731 53.326 65.7131 52.8124 66.6273 51.8981C67.5416 50.9839 68.0552 49.7439 68.0552 48.451V21.1315C68.0552 19.8386 67.5416 18.5986 66.6273 17.6844C65.7131 16.7701 64.4731 16.2565 63.1802 16.2565H14.8462Z"
                    fill="#9D9D9D"
                  />
                  <path
                    d="M13 61.1L10.4 62.4L7.80005 61.1V19.5L13 15.6H58.5001H66.3001L68.9001 18.2L70.2001 46.8L67.6001 53.3L61.1001 54.6H20.8L13 61.1Z"
                    fill="#9D9D9D"
                  />
                  <rect x="22" y="33" width="5" height="5" rx="2.5" fill="white" />
                  <rect x="37" y="33" width="5" height="5" rx="2.5" fill="white" />
                  <rect x="52" y="33" width="5" height="5" rx="2.5" fill="white" />
                </svg>
                <p className="text-[20px] text-deepGray text-center">채팅 내역이 없습니다</p>
              </div>
            )}
            {/* 채팅리스트가 있을 때 */}
            <div>
              <ul className="mt-[25px]">
                {chatData.map((chat) => (
                  <li key={chat.id} className="w-full cursor-pointer" onClick={handleOpenChat}>
                    <div className="relative flex h-[60px]">
                      <div className="w-[44px] h-[44px] rounded-full bg-mainColor mr-[12px]">
                        {/* <img src={chat.photo} alt="Product" className="w-full" /> */}
                      </div>
                      <div>
                        <div className="flex leading-[17px] ">
                          <h3 className="w-[150px] mr-[10px] mb-[5px] text-[13px] font-semibold text-ellipsis line-clamp-1 whitespace-normal overflow-hidden">
                            {chat.title}
                          </h3>
                          <span className="text-[13px] font-semibold text-gray">{chat.people}</span>
                        </div>
                        <p className="w-[200px] text-[12px] leading-[25px] text-deepGray  text-ellipsis line-clamp-1 whitespace-normal overflow-hidden">
                          {chat.message}
                        </p>
                      </div>
                      <div className="absolute top-0 right-[14px] w-[56px] flex flex-wrap justify-end">
                        <p className="text-[10px] text-gray leading-[15px] text-right mb-[10px]">{chat.timestamp}</p>
                        <div className="w-[20px] h-[20] rounded-full bg-[#EE0707] text-center text-white text-[13px]">
                          <p>{chat.unread !== 0 ? chat.unread : ''}</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-[1px] mb-[20px] bg-gray"></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        }
      </Show>
      <TabBar />
    </div>
  );
};

export default ChatListPage;
