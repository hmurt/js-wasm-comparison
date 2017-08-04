#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <emscripten/emscripten.h>

#define STR_SIZE 10000

int main(int argc, char ** argv) {
    printf("WebAssembly module loaded\n");
}

double EMSCRIPTEN_KEEPALIVE string_concat() {
    clock_t begin = clock();
    
    int array_length = 50000;
    const char *array[array_length];
    
    for (int i = 1; i <= array_length; i = i + 1) {
        char *s1;
        char *s2;
        char *s3;
        
        asprintf(&s1, "string %i", i);
        asprintf(&s2, "concatenation %i", i);
        asprintf(&s3, "operation %i", i);
        
        char result[STR_SIZE] = {0};
        snprintf(result, sizeof(result), "%s %s %s", s1, s2, s3);
        array[i] = result;
    }
    
    free(array);
    
    clock_t end = clock();
    
    return (double)(end - begin) * 1000 / CLOCKS_PER_SEC;
}

double EMSCRIPTEN_KEEPALIVE traverse_array() {
    clock_t begin = clock();
    
    int element = 0;
    int iteration = 0;
    int iterations = 0;
    int innerloop = 0;
    double sum = 0.0;
    int array_length = 20000;
    double *array = (double*)malloc(array_length * sizeof(double));

    for (int i = 0; i < array_length; i++)
        array[i] = i;
    for (int i = 0; i < array_length; i++)
        for (int j = 0; j < array_length; j++)
            sum += array[(i + j) % array_length];

    free(array);
    array = NULL;
    
    clock_t end = clock();
    
    return (double)(end - begin) * 1000 / CLOCKS_PER_SEC;
}

