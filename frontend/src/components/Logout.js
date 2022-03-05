import accountApi from 'apis/accountApi';
import { tokenStorage } from 'configs/token';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setMessage } from 'redux/slices/message.slice';
import GlobalLoading from './UI/GlobalLoading';

function Logout() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (!isAuth) {
      history.goBack();
      return;
    }

    tokenStorage.clear();
    dispatch(setMessage({ type: 'success', message: 'Đăng xuất thành công' }));
    window.location.href = history.location.pathname;

    return () => {};
  }, []);

  return <>{isAuth && <GlobalLoading title="Đang đang xuất ..." />}</>;
}

export default Logout;
