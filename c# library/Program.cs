using System;
using System.Collections;
using System.Collections.Generic;
using System.Net.Http;

namespace Pinzonbase
{
    class PlayerData
    {
        public string name = "PLAYER_NAME";
        public int coins = 25;
    }
    class Program
    {
        

        static void Main(string[] args)
        {
            //GetRequest("http://localhost:3002/senddata");
            PostRequest("http://localhost:3002/senddata");

            Console.ReadKey();
        }

        void SerializeDataClass<T>(T data)
        {

        }

        async static void GetRequest(string url)
        {
            using(HttpClient client = new HttpClient())
            {
                using(HttpResponseMessage response = await client.GetAsync(url))
                {
                    using(HttpContent content = response.Content)
                    {
                        string myContent = await content.ReadAsStringAsync();
                        System.Console.WriteLine(myContent);
                    }
                }
            }
        }

        async static void PostRequest(string url)
        {
            using(HttpClient client = new HttpClient())
            {
                
                var content = new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string, string>("dataSent", "")
                });
                var result = await client.PostAsync(url, content);
                string resultContent = await result.Content.ReadAsStringAsync();
                System.Console.WriteLine(resultContent);
            }
        }
    }
}
