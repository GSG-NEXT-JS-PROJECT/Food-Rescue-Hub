"use client";
import React from 'react';
import { FormikProvider, Form } from 'formik';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import TextField from "@/components/text-field";
import useSignin from '../../hooks/useSignin';
import Icons from '@/components/ui/icons';

const Signin: React.FC = () => {
  const { formik } = useSignin();

  return (
  
          <FormikProvider value={formik}>
            <Form 
              onSubmit={formik.handleSubmit} 
              className="space-y-8 bg-white shadow-xl rounded-2xl p-10 border border-gray-100"
            >
              <div className="space-y-6">
                <TextField
                  name="email"
                  label="Email address"
                  type="email"
                  placeholder="Enter your email"
                />
                
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label 
                    htmlFor="remember-me" 
                    className="ml-3 block text-base text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-base">
                  <Link 
                    href="/forgot-password" 
                    className="font-medium text-green-600 hover:text-green-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div>
                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? (
                    <Icons.spinner className="mr-3 h-6 w-6 animate-spin" />
                  ) : null}
                  Sign in
                </Button>
              </div>

              <div className="text-center">
                <p className="text-base text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link 
                    href="/signup" 
                    className="font-medium text-green-600 hover:text-green-500"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </Form>
          </FormikProvider>

  );
};

export default Signin;