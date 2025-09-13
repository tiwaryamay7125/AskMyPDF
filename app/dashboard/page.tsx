"use client";
import React, { useEffect, Suspense, lazy } from 'react';
import createUser from '@/actions/createUser';
import { CenteredLoadingComponent } from '@/components/loadingComponent';

const Navbar = lazy(() => import('@/components/navbar'));
const Document = lazy(() => import('@/components/document'));


function Dashboard() {
  useEffect(() => {
    createUser()

  }, [])
  return (
    <>
      <div>
        <Suspense fallback={<CenteredLoadingComponent />}>
          <Navbar />
          <Document />
        </Suspense>


      </div>

    </>
  )
}

export default Dashboard