export * from './net';

export const sleep = async ms => new Promise(resolve => setTimeout(resolve, ms));
