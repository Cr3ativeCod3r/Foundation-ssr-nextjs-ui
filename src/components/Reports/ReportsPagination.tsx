'use client';

import { useRouter } from 'next/navigation';
import Pagination from '@/components/ui/Pagination';

interface ReportsPaginationProps {
  currentPage: number;
  pageCount: number;
}

/** Pagination for /raporty — navigates via ?page= so the list is server-rendered */
export default function ReportsPagination({ currentPage, pageCount }: ReportsPaginationProps) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > pageCount) return;
    router.push(page === 1 ? '/raporty' : `/raporty?page=${page}`, { scroll: true });
  };

  return (
    <Pagination currentPage={currentPage} pageCount={pageCount} onPageChange={handlePageChange} />
  );
}
