import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import route from 'ziggy-js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AxiosResponse } from 'axios';
import { InertiaProps, Message } from '@/interface/Inertia';
import Breadcrumb from '@/components/Admin/Breadcrumb';
import AdminLayout from '@/layouts/AdminLayout';
import Pagination from '@/components/Admin/Pagination';
import { PaginationData } from '@/interface/pagination';
import api from '@/api/axios';
import Spinner from '@/components/Spinner';

dayjs.extend(relativeTime);

function MessagePage({ auth }: InertiaProps) {
  const [messages, setMessages] = useState<PaginationData<Message> | null>(
    null,
  );
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const onChangePagination = ({ url }: { url: string }) => {
    if (url) {
      setLoading(true);
      api
        .get(url)
        .then((result: AxiosResponse<PaginationData<Message>>) => {
          setMessages(result.data);
        })
        .finally(() => setLoading(false));
    }
  };

  const onChangeCategory = async (newCategory: string) => {
    if (newCategory !== category) {
      setLoading(true);
      await api
        .get(`/admin/message/list?page=1&category=${newCategory}`)
        .then((result: AxiosResponse<PaginationData<Message>>) => {
          setMessages(result.data);
        });
      setCategory(newCategory);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    api
      .get(`/admin/message/list?page=1&category=${category}`)
      .then((result: AxiosResponse<PaginationData<Message>>) => {
        setMessages(result.data);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <AdminLayout user={auth.user}>
      <Head title="Message" />
      <Breadcrumb pageName="Message" />
      <div className="w-full">
        <div className="rounded-sm border border-stroke bg-white p-8 pt-4 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="mb-4 flex gap-4 py-4">
            <button
              onClick={() => onChangeCategory('all')}
              type="button"
              className={`${category === 'all' && 'text-primary'}`}
            >
              All
            </button>
            <button
              onClick={() => onChangeCategory('unread')}
              type="button"
              className={`${category === 'unread' && 'text-primary'}`}
            >
              Unread
            </button>
          </div>
          <div className="mb-4.5">
            {loading ? (
              <div className="mb-5 border-b border-stroke p-4 text-center dark:border-strokedark">
                <Spinner size="medium" />
              </div>
            ) : (
              messages?.data.length === 0 && (
                <div className="mb-5 border-b border-stroke p-4 text-center dark:border-strokedark">
                  <span>There are no messages...</span>
                </div>
              )
            )}
            {messages &&
              !loading &&
              messages.data.map((message) => (
                <Link key={message.id} href={route('message.show', message.id)}>
                  <div
                    className={`mb-2 rounded-md border border-stroke p-4 text-graydark transition-colors duration-200 hover:bg-boxgray-2 dark:border-strokedark dark:text-white dark:hover:bg-boxdark-2 ${
                      message.read
                        ? 'bg-white dark:bg-boxdark'
                        : 'bg-boxgray dark:bg-meta-4'
                    }`}
                  >
                    <div className="mb-2 flex justify-between">
                      <div className="flex flex-col">
                        <span className="font-semibold">{message.name}</span>
                        <span className="text-sm text-body dark:text-dark">
                          {message.email}
                        </span>
                      </div>
                      <small className="text-xs">
                        {dayjs().diff(dayjs(message.created_at), 'd') < 7
                          ? dayjs(message.created_at).fromNow()
                          : dayjs(message.created_at).format('DD MMM YY')}
                      </small>
                    </div>
                    <p className="line-clamp-2 whitespace-pre-line text-justify text-sm">
                      {message.message}
                    </p>
                  </div>
                </Link>
              ))}
            <Pagination {...messages} onChangePagination={onChangePagination} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default MessagePage;
